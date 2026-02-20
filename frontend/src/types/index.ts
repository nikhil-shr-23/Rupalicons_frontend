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

// Backend Enums
export enum ProjectType {
  RESIDENTIAL = "RESIDENTIAL",
  COMMERCIAL = "COMMERCIAL"
}

export enum ProjectStage {
  UnderConstruction = "UnderConstruction",
  RTMI = "RTMI",
  pre_Leased = "pre_Leased",
  NearToPossession = "NearToPossession"
}

export enum UnitType {
  STUDIO_APARTMENT = "STUDIO_APARTMENT", // Display: Studio Apartment
  TWO_BHK = "TWO_BHK",
  TWO_POINT_FIVE_BHK = "TWO_POINT_FIVE_BHK",
  THREE_BHK = "THREE_BHK",
  THREE_POINT_FIVE_BHK = "THREE_POINT_FIVE_BHK",
  FOUR_BHK = "FOUR_BHK",
  FOUR_POINT_FIVE_BHK = "FOUR_POINT_FIVE_BHK",
  FIVE_BHK = "FIVE_BHK",
  PENTHOUSE = "PENTHOUSE",
  DUPLEX_PENTHOUSE = "DUPLEX_PENTHOUSE",
  TRIPLEX_PENTHOUSE = "TRIPLEX_PENTHOUSE",
  VILLA = "VILLA",
  DDJAY_PLOT = "DDJAY_PLOT",
  PLOT = "PLOT"
}

export enum DealType {
  FreshUnit = "FreshUnit",
  ReSale = "ReSale"
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
  
  // Detailed fields
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  
  // New backend fields
  devName?: string;
  projectName?: string; // Align with add-brochure if needed, but title is preferred
  projectType?: ProjectType;
  projectStage?: ProjectStage;
  unitType?: UnitType;
  dealType?: DealType;
  
  imageUrl?: string; 
  brochureUrl?: string;
  
  createdBy?: number;
  createdAt?: string;

  // Add signature index if needed for dynamic property access
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
