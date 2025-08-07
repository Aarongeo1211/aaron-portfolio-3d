import { api } from "encore.dev/api";
import { portfolioDB } from "./db";

export interface SubmitContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubmitContactResponse {
  success: boolean;
  message: string;
}

// Submits a contact form message.
export const submitContact = api<SubmitContactRequest, SubmitContactResponse>(
  { expose: true, method: "POST", path: "/contact" },
  async (req) => {
    await portfolioDB.exec`
      INSERT INTO contacts (name, email, subject, message)
      VALUES (${req.name}, ${req.email}, ${req.subject}, ${req.message})
    `;

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  }
);
