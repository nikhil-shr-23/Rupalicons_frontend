import { Property, PropertyType, PropertyStatus, ContactFormSubmission, Blog, Inquiry, DashboardStats } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = sessionStorage.getItem("adminToken");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

// ─── Property API (Real Backend) ────────────────────────────────────────

export async function fetchProperties(
  page = 0,
  size = 12,
  filters?: {
    type?: PropertyType;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    bedrooms?: number;
  }
): Promise<{ content: Property[]; totalPages: number; totalElements: number }> {
  try {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("size", String(size));
    if (filters?.type) params.set("type", filters.type);
    if (filters?.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
    if (filters?.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
    if (filters?.location) params.set("location", filters.location);
    if (filters?.bedrooms !== undefined) params.set("bedrooms", String(filters.bedrooms));

    const res = await fetch(`${API_URL}/properties?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const content: Property[] = (data.content || []).map(mapPropertyFromBackend);

    return {
      content,
      totalPages: data.totalPages || 0,
      totalElements: data.totalElements || 0,
    };
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return { content: [], totalPages: 0, totalElements: 0 };
  }
}

export async function fetchPropertyById(id: string | number): Promise<Property | null> {
  try {
    const res = await fetch(`${API_URL}/properties/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return mapPropertyFromBackend(data);
  } catch (error) {
    console.error("Failed to fetch property:", error);
    return null;
  }
}

// Admin: Create Property
export async function createProperty(property: Partial<Property>): Promise<Property | null> {
  try {
    const res = await fetch(`${API_URL}/admin/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(buildPropertyPayload(property)),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Create property failed:", errorText);
      return null;
    }
    const data = await res.json();
    return mapPropertyFromBackend(data);
  } catch (error) {
    console.error("Failed to create property:", error);
    return null;
  }
}

// Admin: Update Property
export async function updateProperty(id: string | number, property: Partial<Property>): Promise<Property | null> {
  try {
    const res = await fetch(`${API_URL}/admin/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        ...buildPropertyPayload(property),
        status: property.status,
      }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Update property failed:", errorText);
      return null;
    }
    const data = await res.json();
    return mapPropertyFromBackend(data);
  } catch (error) {
    console.error("Failed to update property:", error);
    return null;
  }
}

// Admin: Delete Property
export async function deleteProperty(id: string | number): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/admin/properties/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeader() },
    });
    return res.ok || res.status === 204;
  } catch (error) {
    console.error("Failed to delete property:", error);
    return false;
  }
}

// ─── Dashboard API (fixed: /admin/dashboard instead of /super-admin) ─

export async function fetchDashboardStats(): Promise<DashboardStats | null> {
  try {
    const res = await fetch(`${API_URL}/admin/dashboard`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return null;
  }
}

// ─── Helper: Build property payload for create/update ────────────────

function buildPropertyPayload(property: Partial<Property>) {
  return {
    title: property.title,
    description: property.description,
    price: property.price || 0,
    rentAmount: property.rentAmount || 0,
    location: property.location,
    size: property.size || "",
    type: property.type,
    imageUrl: property.imageUrl || "",
    brochureUrl: property.brochureUrl || "",
    bedrooms: property.bedrooms || null,
    bathrooms: property.bathrooms || null,
    sqft: property.sqft || null,
    featured: property.featured || false,
    buildingType: property.buildingType || "",
    propertyCategory: property.propertyCategory || "",
    city: property.city || "",
    microMarket: property.microMarket || "",
    locality: property.locality || "",
    flooring: property.flooring || "",
    floorNumber: property.floorNumber || null,
    totalFloors: property.totalFloors || null,
    unitNumber: property.unitNumber || null,
    availableFrom: property.availableFrom || "",
    tags: property.tags || "",
    furnishingDetails: property.furnishingDetails || "",
    furnishingStatus: property.furnishingStatus || "",
    agentName: property.agentName || "",
    agentPhotoUrl: property.agentPhotoUrl || "",
    amenities: property.amenities || "",
  };
}

// ─── Helper: Map backend DTO → frontend Property ────────────────────

function mapPropertyFromBackend(dto: Record<string, unknown>): Property {
  return {
    id: dto.id as number,
    title: (dto.title as string) || "",
    description: (dto.description as string) || "",
    price: dto.price ? Number(dto.price) : undefined,
    rentAmount: dto.rentAmount ? Number(dto.rentAmount) : undefined,
    location: (dto.location as string) || "",
    size: (dto.size as string) || "",
    type: (dto.type as PropertyType) || PropertyType.SALE,
    status: (dto.status as PropertyStatus) || PropertyStatus.AVAILABLE,
    createdBy: dto.createdBy ? Number(dto.createdBy) : undefined,
    createdAt: dto.createdAt ? String(dto.createdAt) : undefined,
    imageUrl: (dto.imageUrl as string) || undefined,
    brochureUrl: (dto.brochureUrl as string) || undefined,
    bedrooms: dto.bedrooms ? Number(dto.bedrooms) : undefined,
    bathrooms: dto.bathrooms ? Number(dto.bathrooms) : undefined,
    sqft: dto.sqft ? Number(dto.sqft) : undefined,
    featured: (dto.featured as boolean) || false,
    buildingType: (dto.buildingType as string) || undefined,
    propertyCategory: (dto.propertyCategory as string) || undefined,
    city: (dto.city as string) || undefined,
    microMarket: (dto.microMarket as string) || undefined,
    locality: (dto.locality as string) || undefined,
    flooring: (dto.flooring as string) || undefined,
    floorNumber: dto.floorNumber ? Number(dto.floorNumber) : undefined,
    totalFloors: dto.totalFloors ? Number(dto.totalFloors) : undefined,
    unitNumber: dto.unitNumber ? Number(dto.unitNumber) : undefined,
    availableFrom: (dto.availableFrom as string) || undefined,
    tags: (dto.tags as string) || undefined,
    furnishingDetails: (dto.furnishingDetails as string) || undefined,
    furnishingStatus: (dto.furnishingStatus as string) || undefined,
    agentName: (dto.agentName as string) || undefined,
    agentPhotoUrl: (dto.agentPhotoUrl as string) || undefined,
    amenities: (dto.amenities as string) || undefined,
  };
}

// ─── Default Property (for forms) ───────────────────────────────────────

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
  brochureUrl: "",
};

// ─── Contact Form (no backend endpoint – frontend-only) ─────────────────

export async function submitContactForm(submission: ContactFormSubmission): Promise<boolean> {
  console.log("Contact form submitted:", submission);
  return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
}

// ─── Blog Mock Data (no backend endpoint yet) ───────────────────────────

const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "Top 5 Emerging Property Hotspots 2024",
    content: "Discover the latest emerging markets in real estate...",
    author: "Jane Doe",
    category: "Market Trends",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Investing in Real Estate: A Beginner's Guide",
    content: "Learn how to start your real estate investment journey...",
    author: "John Smith",
    category: "Real Estate",
    createdAt: new Date().toISOString(),
  },
];

export async function fetchBlogs(): Promise<Blog[]> {
  return mockBlogs;
}

export async function fetchBlogById(id: number): Promise<Blog | null> {
  return mockBlogs.find((b) => b.id === id) || null;
}

export async function createBlog(formData: FormData): Promise<Blog | null> {
  const newBlog: Blog = {
    id: Math.floor(Math.random() * 10000),
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    author: formData.get("author") as string,
    category: formData.get("category") as string,
    createdAt: new Date().toISOString(),
  };
  mockBlogs.push(newBlog);
  return newBlog;
}

export async function deleteBlog(id: number): Promise<boolean> {
  const index = mockBlogs.findIndex((b) => b.id === id);
  if (index !== -1) {
    mockBlogs.splice(index, 1);
    return true;
  }
  return false;
}

// ─── Inquiry/Lead Mock Data (no backend endpoint yet) ───────────────────

const mockInquiries: Inquiry[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "1234567890",
    location: "Mumbai",
    message: "Interested in 3BHK",
    createdAt: new Date().toISOString(),
    status: "NEW",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "9876543210",
    location: "Delhi",
    message: "Looking for commercial space",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: "CONTACTED",
  },
];

export async function fetchContactSubmissions(): Promise<Inquiry[]> {
  return mockInquiries;
}

export async function fetchInquiries(): Promise<Inquiry[]> {
  return mockInquiries;
}

export async function deleteInquiry(id: number): Promise<boolean> {
  const index = mockInquiries.findIndex((i) => i.id === id);
  if (index !== -1) {
    mockInquiries.splice(index, 1);
    return true;
  }
  return false;
}
