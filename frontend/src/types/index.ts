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
  id?: number;
  title: string;
  description: string;
  price?: number;
  rentAmount?: number;
  location: string;
  size?: string;
  type: PropertyType;
  status: PropertyStatus;

  // Media
  imageUrl?: string;
  brochureUrl?: string;

  // Room details
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  featured?: boolean;

  // Extended real estate fields
  buildingType?: string;
  propertyCategory?: string;
  city?: string;
  microMarket?: string;
  locality?: string;
  flooring?: string;
  floorNumber?: number;
  totalFloors?: number;
  unitNumber?: number;
  availableFrom?: string;
  tags?: string;              // comma-separated highlights
  furnishingDetails?: string; // e.g. "1 Fan, 1 Geyser, 1 Bed"
  furnishingStatus?: string;  // "Semi-Furnished", "Fully Furnished", "Unfurnished"

  createdBy?: number;
  createdAt?: string;

  [key: string]: unknown;
}

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

export interface Inquiry extends ContactFormSubmission {
    id: number;
    createdAt: string;
    status: "NEW" | "CONTACTED" | "CLOSED";
}

export interface DashboardStats {
    totalUsers: number;
    totalProperties: number;
    totalSoldProperties: number;
    totalRentedProperties: number;
    totalSalesRevenue: number;
    totalRentalIncome: number;
}
