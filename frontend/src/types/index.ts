export enum ProjectType {
  RESIDENTIAL = "RESIDENTIAL",
  COMMERCIAL = "COMMERCIAL",
  MIXED_USE = "MIXED_USE"
}

export enum ProjectStage {
  PRE_LAUNCH = "PRE_LAUNCH",
  UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
  COMPLETED = "COMPLETED"
}

export enum UnitType {
  APARTMENT = "APARTMENT",
  VILLA = "VILLA",
  PENTHOUSE = "PENTHOUSE",
  OFFICE = "OFFICE",
  RETAIL = "RETAIL"
}

export enum DealType {
  SALE = "SALE",
  RENT = "RENT",
  LEASE = "LEASE"
}

export interface Property {
  propertiesId?: number;
  devName: string;
  projectName: string;
  projectType: ProjectType;
  launchTime?: string;
  launchPrice?: string;
  unitType: UnitType;
  projectStage: ProjectStage;
  location: string;
  dealType: DealType;
  unitSize?: number;
  unitNumber?: number;
  FloorNumber?: number;
  OwnerName?: string;
  OwnerAddress?: string;
  CurrentPrice?: number;
  AskingPrice?: number;
  Notes?: string;
  imageUrl?: string;
  brochureUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
