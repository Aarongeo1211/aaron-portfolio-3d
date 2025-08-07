import { api, APIError } from "encore.dev/api";
import { portfolioDB } from "./db";
import { secret } from "encore.dev/config";

const jwtSecret = secret("JWTSecret");

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  lastLogin?: Date;
}

// Simple password hashing (in production, use bcrypt)
function hashPassword(password: string): string {
  // This is a simple hash for demo purposes
  // In production, use proper bcrypt hashing
  return Buffer.from(password).toString('base64');
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

function generateJWT(userId: number, email: string, role: string): string {
  // Simple JWT implementation for demo
  // In production, use a proper JWT library
  const payload = {
    userId,
    email,
    role,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

// Authenticates a user and returns a JWT token.
export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    const user = await portfolioDB.queryRow<{
      id: number;
      email: string;
      password_hash: string;
      name: string;
      role: string;
    }>`SELECT id, email, password_hash, name, role FROM users WHERE email = ${req.email}`;

    if (!user || !verifyPassword(req.password, user.password_hash)) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    // Update last login
    await portfolioDB.exec`UPDATE users SET last_login = NOW() WHERE id = ${user.id}`;

    const token = generateJWT(user.id, user.email, user.role);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
);

// Registers a new user account.
export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    // Check if user already exists
    const existingUser = await portfolioDB.queryRow`
      SELECT id FROM users WHERE email = ${req.email}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("User with this email already exists");
    }

    // Hash password and create user
    const passwordHash = hashPassword(req.password);
    
    await portfolioDB.exec`
      INSERT INTO users (email, password_hash, name)
      VALUES (${req.email}, ${passwordHash}, ${req.name})
    `;

    return {
      success: true,
      message: "Account created successfully! You can now log in.",
    };
  }
);
