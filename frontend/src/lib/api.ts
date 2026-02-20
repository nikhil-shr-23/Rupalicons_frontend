import { Property, PropertyType, PropertyStatus, ContactFormSubmission, Blog, Inquiry } from "../types";

export function getAuthHeader(): Record<string, string> {
  return {};
}

// Mock Data
export const mockProperties: Property[] = [
  {
    id: 1,
    title: "Luxury Villa in Beverly Hills",
    description: "A stunning 5-bedroom villa with a private pool and garden.",
    type: PropertyType.SALE,
    status: PropertyStatus.AVAILABLE,
    location: "Beverly Hills",
    price: 45000000,
    size: "4500 sqft",
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=2670",
    brochureUrl: "",
    createdAt: new Date().toISOString(),
    bedrooms: 5,
    bathrooms: 6,
    sqft: 4500
  },
  {
    id: 2,
    title: "Modern Apartment in City Center",
    description: "3BHK apartment with panoramic city views.",
    type: PropertyType.SALE,
    status: PropertyStatus.AVAILABLE,
    location: "City Center",
    price: 12000000,
    size: "1800 sqft",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2670",
    brochureUrl: "",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Cozy Studio Near Park",
    description: "Perfect for singles or couples, fully furnished.",
    type: PropertyType.RENT,
    status: PropertyStatus.AVAILABLE,
    location: "Green Park",
    rentAmount: 25000,
    size: "600 sqft",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2670",
    brochureUrl: "",
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Spacious Office Space",
    description: "Ready to move in office space for startups.",
    type: PropertyType.RENT,
    status: PropertyStatus.AVAILABLE,
    location: "Business Hub",
    rentAmount: 50000,
    size: "1200 sqft",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2670",
    brochureUrl: "",
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    title: "Seaside Penthouse",
    description: "Exclusive penthouse with ocean view.",
    type: PropertyType.SALE,
    status: PropertyStatus.AVAILABLE,
    location: "Coastal Road",
    price: 85000000,
    size: "3200 sqft",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2670",
    brochureUrl: "",
    createdAt: new Date().toISOString()
  },
  {
    id: 6,
    title: "Suburban Family Home",
    description: "4 bedrooms, large backyard, quiet neighborhood.",
    type: PropertyType.SALE,
    status: PropertyStatus.AVAILABLE,
    location: "Suburbs",
    price: 25000000,
    size: "2800 sqft",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-e32898659994?auto=format&fit=crop&q=80&w=2670",
    brochureUrl: "",
    createdAt: new Date().toISOString()
  }
];

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
): Promise<{ content: Property[], totalPages: number, totalElements: number }> {
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filtered = [...mockProperties];

  if (filters?.type) {
    filtered = filtered.filter(p => p.type === filters.type);
  }

  if (filters?.location) {
    const loc = filters.location.toLowerCase();
    filtered = filtered.filter(p => p.location.toLowerCase().includes(loc));
  }

  if (filters?.bedrooms) {
    filtered = filtered.filter(p => (p.bedrooms || 0) >= (filters.bedrooms || 0));
  }

  if (filters?.minPrice !== undefined) {
    filtered = filtered.filter(p => {
      const price = p.type === PropertyType.SALE ? p.price : p.rentAmount;
      return (price || 0) >= (filters.minPrice || 0);
    });
  }

  if (filters?.maxPrice !== undefined) {
    filtered = filtered.filter(p => {
      const price = p.type === PropertyType.SALE ? p.price : p.rentAmount;
      return (price || 0) <= (filters.maxPrice || 0);
    });
  }

  const start = page * size;
  const end = start + size;
  const content = filtered.slice(start, end);

  return {
    content,
    totalPages: Math.ceil(filtered.length / size),
    totalElements: filtered.length
  };
}

export async function fetchPropertyById(id: string | number): Promise<Property | null> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network
  return mockProperties.find(p => p.id == id) || null;
}

// Admin only (Mock implementation)
export async function createProperty(property: Property): Promise<Property | null> {
  const newProperty: Property = {
    ...property,
    id: Math.floor(Math.random() * 10000),
    createdAt: new Date().toISOString()
  };
  mockProperties.push(newProperty);
  return newProperty;
}

export async function updateProperty(id: string | number, property: Partial<Property>): Promise<Property | null> {
  const index = mockProperties.findIndex(p => p.id == id);
  if (index !== -1) {
    mockProperties[index] = { ...mockProperties[index], ...property };
    return mockProperties[index];
  }
  return null;
}

export async function deleteProperty(id: string | number): Promise<boolean> {
  const index = mockProperties.findIndex(p => p.id == id);
  if (index !== -1) {
    mockProperties.splice(index, 1);
    return true;
  }
  return false;
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

export async function submitContactForm(submission: ContactFormSubmission): Promise<boolean> {
  console.log("Contact form submitted:", submission);
  return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
}

// Mock Blogs
const mockBlogs: Blog[] = [
    {
        id: 1,
        title: "Top 5 Emerging Property Hotspots 2024",
        content: "Discover the latest emerging markets in real estate...",
        author: "Jane Doe",
        category: "Market Trends",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Investing in Real Estate: A Beginner's Guide",
        content: "Learn how to start your real estate investment journey...",
        author: "John Smith",
        category: "Real Estate",
        createdAt: new Date().toISOString()
    }
];

export async function fetchBlogs(): Promise<Blog[]> {
  return mockBlogs;
}

export async function fetchBlogById(id: number): Promise<Blog | null> {
  return mockBlogs.find(b => b.id === id) || null;
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


// Mock Inquiries/Leads
// Mock Inquiries/Leads
// import { Inquiry } from "../types";

const mockInquiries: Inquiry[] = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "1234567890",
        location: "Mumbai",
        message: "Interested in 3BHK",
        createdAt: new Date().toISOString(),
        status: "NEW"
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        phone: "9876543210",
        location: "Delhi",
        message: "Looking for commercial space",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        status: "CONTACTED"
    }
];

export async function fetchContactSubmissions(): Promise<Inquiry[]> {
    return mockInquiries;
}

export async function fetchInquiries(): Promise<Inquiry[]> {
    return mockInquiries;
}

export async function deleteInquiry(id: number): Promise<boolean> {
    const index = mockInquiries.findIndex(i => i.id === id);
    if (index !== -1) {
        mockInquiries.splice(index, 1);
        return true;
    }
    return false;
}

