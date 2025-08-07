import { api } from "encore.dev/api";
import { portfolioDB } from "./db";

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  category: string;
  featured: boolean;
  createdAt: Date;
}

export interface GetProjectsResponse {
  projects: Project[];
}

// Retrieves all projects, ordered by creation date (latest first).
export const getProjects = api<void, GetProjectsResponse>(
  { expose: true, method: "GET", path: "/projects" },
  async () => {
    const rows = await portfolioDB.queryAll<{
      id: number;
      title: string;
      description: string;
      tech_stack: string[];
      github_url?: string;
      demo_url?: string;
      image_url?: string;
      category: string;
      featured: boolean;
      created_at: Date;
    }>`SELECT * FROM projects ORDER BY created_at DESC`;

    const projects: Project[] = rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      techStack: row.tech_stack,
      githubUrl: row.github_url,
      demoUrl: row.demo_url,
      imageUrl: row.image_url,
      category: row.category,
      featured: row.featured,
      createdAt: row.created_at,
    }));

    return { projects };
  }
);
