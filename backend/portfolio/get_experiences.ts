import { api } from "encore.dev/api";
import { portfolioDB } from "./db";

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  techStack: string[];
  startDate: Date;
  endDate?: Date;
  location?: string;
  createdAt: Date;
}

export interface GetExperiencesResponse {
  experiences: Experience[];
}

// Retrieves all work experiences, ordered by start date (latest first).
export const getExperiences = api<void, GetExperiencesResponse>(
  { expose: true, method: "GET", path: "/experiences" },
  async () => {
    const rows = await portfolioDB.queryAll<{
      id: number;
      company: string;
      position: string;
      description: string;
      tech_stack: string[];
      start_date: Date;
      end_date?: Date;
      location?: string;
      created_at: Date;
    }>`SELECT * FROM experiences ORDER BY start_date DESC`;

    const experiences: Experience[] = rows.map(row => ({
      id: row.id,
      company: row.company,
      position: row.position,
      description: row.description,
      techStack: row.tech_stack,
      startDate: row.start_date,
      endDate: row.end_date,
      location: row.location,
      createdAt: row.created_at,
    }));

    return { experiences };
  }
);
