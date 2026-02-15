import { Property, ProjectType, UnitType, ProjectStage, DealType } from "../types";

const API_BASE_URL = "http://localhost:8080";

export async function fetchProjects(page = 0, size = 10): Promise<{ content: Property[] }> {
  try {
    const response = await fetch(`${API_BASE_URL}/properties?page=${page}&size=${size}`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { content: [] };
  }
}

export async function createProject(project: Property): Promise<Property | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating project:", error);
    return null;
  }
}

export async function deleteProject(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
}

export const defaultProperty: Property = {
  devName: "Rupali Developers",
  projectName: "",
  projectType: ProjectType.RESIDENTIAL,
  unitType: UnitType.APARTMENT,
  projectStage: ProjectStage.PRE_LAUNCH,
  location: "",
  dealType: DealType.SALE,
  imageUrl: "",
  brochureUrl: ""
};
