import { Property, PropertyType, PropertyStatus, ContactFormSubmission, Blog } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function getAuthHeader(): Record<string, string> {
  const token = sessionStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchProperties(
  page = 0, 
  size = 12, 
  filters?: {
    type?: PropertyType;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
  }
): Promise<{ content: Property[], totalPages: number, totalElements: number }> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortDir: 'desc',
      sortBy: 'createdAt'
    });

    if (filters?.type) params.append('type', filters.type);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.location) params.append('location', filters.location);

    const response = await fetch(`${API_BASE_URL}/properties?${params.toString()}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    
    const data = await response.json();
    return {
      content: data.content || [],
      totalPages: data.totalPages || 0,
      totalElements: data.totalElements || 0
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { content: [], totalPages: 0, totalElements: 0 };
  }
}

// Admin only
export async function createProperty(property: Property): Promise<Property | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(property),
    });

    if (!response.ok) {
      throw new Error("Failed to create property");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating property:", error);
    return null;
  }
}

export async function updateProperty(id: string, property: Partial<Property>): Promise<Property | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(property),
    });

    if (!response.ok) {
      throw new Error("Failed to update property");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating property:", error);
    return null;
  }
}

export async function deleteProperty(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/properties/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeader(),
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting property:", error);
    return false;
  }
}

export const defaultProperty: Property = {
  title: "",
  description: "",
  type: PropertyType.SALE,
  status: PropertyStatus.AVAILABLE,
  location: "",
  price: 0,
  rentAmount: 0,
  size: "",
  imageUrl: "",
  brochureUrl: ""
};

// Contact Form (Mock or client-side only for now)
export async function submitContactForm(submission: ContactFormSubmission): Promise<boolean> {
  // Backend doesn't support generic inquiries yet.
  // Log to console or use a mailer service if configured.
  console.log("Contact form submitted:", submission);
  return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
}

// Deprecated Buyer functions are removed. Use submitContactForm for general inquiries.

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
