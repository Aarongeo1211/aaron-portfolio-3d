import { api } from "encore.dev/api";
import { portfolioDB } from "./db";

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  createdAt: Date;
}

export interface GetSkillsResponse {
  skills: Skill[];
}

// Retrieves all skills grouped by category.
export const getSkills = api<void, GetSkillsResponse>(
  { expose: true, method: "GET", path: "/skills" },
  async () => {
    const rows = await portfolioDB.queryAll<{
      id: number;
      name: string;
      category: string;
      proficiency: number;
      icon?: string;
      created_at: Date;
    }>`SELECT * FROM skills ORDER BY category, proficiency DESC`;

    const skills: Skill[] = rows.map(row => ({
      id: row.id,
      name: row.name,
      category: row.category,
      proficiency: row.proficiency,
      icon: row.icon,
      createdAt: row.created_at,
    }));

    return { skills };
  }
);
