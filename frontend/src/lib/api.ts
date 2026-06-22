import { Property, PropertyType, PropertyStatus, ContactFormSubmission, Blog, Inquiry, DashboardStats } from "../types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.rupalihomes.com";

export function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = sessionStorage.getItem("adminToken");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

// ─── Property API (Real Backend) ────────────────────────────────────────

const ADMIN_PROPERTY_CACHE_KEY = "rupalihomes_admin_property_cache";

function normalizePropertyStatus(status: unknown): PropertyStatus {
  if (!status) return PropertyStatus.AVAILABLE;
  const normalized = String(status).toUpperCase();
  if (Object.values(PropertyStatus).includes(normalized as PropertyStatus)) {
    return normalized as PropertyStatus;
  }
  return PropertyStatus.AVAILABLE;
}

function readAdminPropertyCache(): Property[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ADMIN_PROPERTY_CACHE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Property[];
    return Array.isArray(parsed) ? parsed.map((p) => ({ ...p, status: normalizePropertyStatus(p.status) })) : [];
  } catch {
    return [];
  }
}

function writeAdminPropertyCache(properties: Property[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_PROPERTY_CACHE_KEY, JSON.stringify(properties));
}

function cacheAdminProperty(property: Property) {
  if (!property.id) return;
  const cached = readAdminPropertyCache().filter((p) => p.id !== property.id);
  if (property.status !== PropertyStatus.AVAILABLE) {
    cached.push(property);
  }
  writeAdminPropertyCache(cached);
}

function removeAdminPropertyFromCache(id: string | number) {
  writeAdminPropertyCache(readAdminPropertyCache().filter((p) => String(p.id) !== String(id)));
}

function mergeAdminProperties(available: Property[], cached: Property[]): Property[] {
  const byId = new Map<number, Property>();
  for (const property of available) {
    if (property.id != null) byId.set(property.id, property);
  }
  for (const property of cached) {
    if (property.id != null && property.status !== PropertyStatus.AVAILABLE) {
      byId.set(property.id, property);
    }
  }
  return Array.from(byId.values()).sort((a, b) => {
    const aTime = a.createdAt ? Date.parse(a.createdAt) : 0;
    const bTime = b.createdAt ? Date.parse(b.createdAt) : 0;
    return bTime - aTime;
  });
}

async function fetchAdminPropertiesFallback(
  page = 0,
  size = 100,
): Promise<{ content: Property[]; totalPages: number; totalElements: number }> {
  const [available, cached] = await Promise.all([
    fetchProperties(page, size),
    Promise.resolve(readAdminPropertyCache()),
  ]);
  const content = mergeAdminProperties(available.content, cached);
  return {
    content,
    totalPages: 1,
    totalElements: content.length,
  };
}

/** Admin list: all statuses. Uses /admin/properties when available, otherwise merges public list + local cache. */
export async function fetchAdminProperties(
  page = 0,
  size = 100,
): Promise<{ content: Property[]; totalPages: number; totalElements: number }> {
  try {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("size", String(size));

    const res = await fetch(`${API_URL}/admin/properties?${params.toString()}`, {
      headers: { ...getAuthHeader() },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const rawContent = Array.isArray(data) ? data : data.content || [];
    const content: Property[] = rawContent.map(mapPropertyFromBackend);

    writeAdminPropertyCache(
      content.filter((property) => property.status !== PropertyStatus.AVAILABLE),
    );

    return {
      content,
      totalPages: data.totalPages || 1,
      totalElements: data.totalElements || content.length,
    };
  } catch (error) {
    console.warn("Admin properties endpoint unavailable, using fallback:", error);
    return fetchAdminPropertiesFallback(page, size);
  }
}

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
    const updated = mapPropertyFromBackend(data);
    cacheAdminProperty(updated);
    return updated;
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
    if (res.ok || res.status === 204) {
      removeAdminPropertyFromCache(id);
      return true;
    }
    return false;
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
    imageGallery: property.imageGallery || "",
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
    status: normalizePropertyStatus(dto.status),
    createdBy: dto.createdBy ? Number(dto.createdBy) : undefined,
    createdAt: dto.createdAt ? String(dto.createdAt) : undefined,
    imageUrl: (dto.imageUrl as string) || undefined,
    imageGallery: (dto.imageGallery as string) || undefined,
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

// ─── Contact Form → submits as an inquiry with type "CONTACT" ─────────────

export async function submitContactForm(submission: ContactFormSubmission): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: submission.name,
        phone: submission.phone,
        email: submission.email,
        type: "CONTACT",
        city: submission.location,
        message: submission.message,
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return false;
  }
}

export async function submitInquiry(inquiry: {
  name: string;
  phone: string;
  email?: string;
  type: string;
  city?: string;
  propertyType?: string;
  message?: string;
}): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inquiry),
    });
    return res.ok;
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return false;
  }
}

// ─── Visitor Identity (stored in localStorage as an identifier only) ─────

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("visitorId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("visitorId", id);
  }
  return id;
}

// ─── Like System (DB-backed) ─────────────────────────────────────────────

export async function likeProperty(propertyId: string | number): Promise<boolean> {
  try {
    const visitorId = getVisitorId();
    const res = await fetch(`${API_URL}/likes/${propertyId}?visitorId=${visitorId}`, {
      method: "POST",
    });
    return res.ok;
  } catch (error) {
    console.error("Failed to like property:", error);
    return false;
  }
}

export async function unlikeProperty(propertyId: string | number): Promise<boolean> {
  try {
    const visitorId = getVisitorId();
    const res = await fetch(`${API_URL}/likes/${propertyId}?visitorId=${visitorId}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    console.error("Failed to unlike property:", error);
    return false;
  }
}

export async function fetchLikedPropertyIds(): Promise<number[]> {
  try {
    const visitorId = getVisitorId();
    const res = await fetch(`${API_URL}/likes?visitorId=${visitorId}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch liked IDs:", error);
    return [];
  }
}

export async function fetchLikedProperties(): Promise<Property[]> {
  try {
    const visitorId = getVisitorId();
    const res = await fetch(`${API_URL}/likes/properties?visitorId=${visitorId}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data || []).map(mapPropertyFromBackend);
  } catch (error) {
    console.error("Failed to fetch liked properties:", error);
    return [];
  }
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

// ─── Inquiry/Lead API (Real Backend) ─────────────────────────────────────

export async function fetchContactSubmissions(): Promise<Inquiry[]> {
  return fetchInquiries();
}

export async function fetchInquiries(): Promise<Inquiry[]> {
  try {
    const res = await fetch(`${API_URL}/admin/inquiries`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return [];
  }
}

export async function deleteInquiry(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/admin/inquiries/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeader() },
    });
    return res.ok || res.status === 204;
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return false;
  }
}

// ─── Helper: Get admin role from JWT ────────────────────────────────────

export function getAdminRole(): string | null {
  if (typeof window === "undefined") return null;
  const token = sessionStorage.getItem("adminToken");
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.role || null;
  } catch {
    return null;
  }
}

// ─── Image Upload API ───────────────────────────────────────────────────

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Upload failed: ${err.error || res.statusText}`);
  }

  const data = await res.json();
  return data.url;
}

// ─── Super Admin API ───────────────────────────────────────────────────

export async function fetchAdmins(): Promise<import("../types").Admin[]> {
  try {
    const res = await fetch(`${API_URL}/super-admin/admins`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch admins");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteAdmin(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/super-admin/admins/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    return res.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createAdmin(data: { name: string; email: string; password: string }): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/super-admin/admins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return res.ok || res.status === 201;
  } catch (error) {
    console.error("Failed to create admin:", error);
    return false;
  }
}
