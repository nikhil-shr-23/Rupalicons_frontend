export enum PropertyType {
  SALE = "SALE",
  RENT = "RENT",
}

export enum PropertyStatus {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
  RENTED = "RENTED",
  HIDDEN = "HIDDEN",
}

export interface Property {
  id?: number; // Long from backend
  title: string;
  description: string;
  price?: number;
  rentAmount?: number;
  location: string;
  size?: string;
  type: PropertyType;
  status: PropertyStatus;
  createdBy?: number;
  createdAt?: string;
  
  // Frontend specific helper (backend doesn't send image URL in main DTO yet? 
  // Wait, PropertyResponseDTO didn't list imageUrl. 
  // I should keep it optional if I plan to add it or if it's missing)
  imageUrl?: string; 
  brochureUrl?: string;
}

// Buyer/Inquiry types are removed as backend doesn't support them yet.
// Keeping a placeholder if needed for UI state but not for API.
export interface ContactFormSubmission {
  name: string;
  phone: string;
  email: string;
  location: string;
  message: string;
}

export interface Blog {
    id?: number;
    title: string;
    content: string;
    author: string;
    category: string;
    imageType?: string;
    imageName?: string;
    createdAt?: string;
    updatedAt?: string;
}
