import { Property, ProjectType, UnitType, ProjectStage, DealType, Blog, Inquiry } from "../types";

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

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, { cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch blogs");
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function fetchBlogById(id: number): Promise<Blog | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, { cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch blog");
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function createBlog(formData: FormData): Promise<Blog | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      body: formData, // FormData automatically sets the Content-Type to multipart/form-data
    });
    if (!response.ok) throw new Error("Failed to create blog");
    return await response.json();
  } catch (error) {
    console.error("Error creating blog:", error);
    return null;
  }
}

export async function deleteBlog(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, { method: "DELETE" });
    return response.ok;
  } catch (error) {
    console.error("Error deleting blog:", error);
    return false;
  }
}

// Inquiries
export async function fetchInquiries(): Promise<Inquiry[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries`, { cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch inquiries");
    return await response.json();
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return [];
  }
}

export async function createInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<Inquiry | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry),
    });
    if (!response.ok) throw new Error("Failed to create inquiry");
    return await response.json();
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return null;
  }
}

export async function deleteInquiry(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, { method: "DELETE" });
    return response.ok;
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return false;
  }
}
