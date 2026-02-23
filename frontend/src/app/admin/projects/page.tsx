"use client";

import { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit,
  Trash2,
  X,
  RefreshCw,
  Star,
  Bed,
  Bath,
  Maximize,
  Image as ImageIcon,
  FileDown,
  CheckCircle,
  Tag,
  ChevronDown,
  ChevronUp,
  Building2,
  MapPin,
  Layers,
} from "lucide-react";
import {
  fetchProperties,
  deleteProperty,
  createProperty,
  updateProperty,
} from "@/lib/api";
import {
  AMENITY_OPTIONS,
  getAmenityIcon,
  ICON_PICKER_OPTIONS,
  AMENITY_ICON_MAP,
} from "@/lib/amenities";
import type { LucideIcon } from "lucide-react";
import { Property, PropertyType, PropertyStatus } from "@/types";
import Image from "next/image";

export default function AdminProjects() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Form state — core
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formRentAmount, setFormRentAmount] = useState("");
  const [formSize, setFormSize] = useState("");
  const [formType, setFormType] = useState<PropertyType>(PropertyType.SALE);
  const [formStatus, setFormStatus] = useState<PropertyStatus>(
    PropertyStatus.AVAILABLE,
  );
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formBrochureUrl, setFormBrochureUrl] = useState("");
  const [formBedrooms, setFormBedrooms] = useState("");
  const [formBathrooms, setFormBathrooms] = useState("");
  const [formSqft, setFormSqft] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);

  // Form state — extended
  const [formBuildingType, setFormBuildingType] = useState("");
  const [formPropertyCategory, setFormPropertyCategory] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formMicroMarket, setFormMicroMarket] = useState("");
  const [formLocality, setFormLocality] = useState("");
  const [formFlooring, setFormFlooring] = useState("");
  const [formFloorNumber, setFormFloorNumber] = useState("");
  const [formTotalFloors, setFormTotalFloors] = useState("");
  const [formUnitNumber, setFormUnitNumber] = useState("");
  const [formAvailableFrom, setFormAvailableFrom] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formFurnishingDetails, setFormFurnishingDetails] = useState("");
  const [formFurnishingStatus, setFormFurnishingStatus] = useState("");

  // Form state — agent & amenities
  const [formAgentName, setFormAgentName] = useState("");
  const [formAgentPhotoUrl, setFormAgentPhotoUrl] = useState("");
  const [formAmenities, setFormAmenities] = useState<string[]>([]);

  // Custom amenity state
  const [customAmenityName, setCustomAmenityName] = useState("");
  const [customAmenityIcon, setCustomAmenityIcon] = useState("ShieldCheck");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [customAmenityIcons, setCustomAmenityIcons] = useState<
    Record<string, string>
  >({});
  const iconPickerRef = useRef<HTMLDivElement>(null);

  const toggleAmenity = (amenity: string) => {
    setFormAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const addCustomAmenity = () => {
    const name = customAmenityName.trim();
    if (!name) return;
    if (!formAmenities.includes(name)) {
      setFormAmenities((prev) => [...prev, name]);
      setCustomAmenityIcons((prev) => ({ ...prev, [name]: customAmenityIcon }));
    }
    setCustomAmenityName("");
    setCustomAmenityIcon("ShieldCheck");
  };

  const removeAmenity = (amenity: string) => {
    setFormAmenities((prev) => prev.filter((a) => a !== amenity));
    setCustomAmenityIcons((prev) => {
      const copy = { ...prev };
      delete copy[amenity];
      return copy;
    });
  };

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await fetchProperties(0, 100);
      if (data && data.content) setProperties(data.content);
    } catch (error) {
      console.error("Failed to load properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const resetForm = () => {
    setFormTitle("");
    setFormDescription("");
    setFormLocation("");
    setFormPrice("");
    setFormRentAmount("");
    setFormSize("");
    setFormType(PropertyType.SALE);
    setFormStatus(PropertyStatus.AVAILABLE);
    setFormImageUrl("");
    setFormBrochureUrl("");
    setFormBedrooms("");
    setFormBathrooms("");
    setFormSqft("");
    setFormFeatured(false);
    setFormBuildingType("");
    setFormPropertyCategory("");
    setFormCity("");
    setFormMicroMarket("");
    setFormLocality("");
    setFormFlooring("");
    setFormFloorNumber("");
    setFormTotalFloors("");
    setFormUnitNumber("");
    setFormAvailableFrom("");
    setFormTags("");
    setFormFurnishingDetails("");
    setFormFurnishingStatus("");
    setFormAgentName("");
    setFormAgentPhotoUrl("");
    setFormAmenities([]);
    setEditingProperty(null);
    setShowForm(false);
    setShowAdvanced(false);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (p: Property) => {
    setEditingProperty(p);
    setFormTitle(p.title || "");
    setFormDescription(p.description || "");
    setFormLocation(p.location || "");
    setFormPrice(String(p.price || ""));
    setFormRentAmount(String(p.rentAmount || ""));
    setFormSize(p.size || "");
    setFormType(p.type);
    setFormStatus(p.status);
    setFormImageUrl(p.imageUrl || "");
    setFormBrochureUrl(p.brochureUrl || "");
    setFormBedrooms(String(p.bedrooms || ""));
    setFormBathrooms(String(p.bathrooms || ""));
    setFormSqft(String(p.sqft || ""));
    setFormFeatured(p.featured || false);
    setFormBuildingType(p.buildingType || "");
    setFormPropertyCategory(p.propertyCategory || "");
    setFormCity(p.city || "");
    setFormMicroMarket(p.microMarket || "");
    setFormLocality(p.locality || "");
    setFormFlooring(p.flooring || "");
    setFormFloorNumber(String(p.floorNumber || ""));
    setFormTotalFloors(String(p.totalFloors || ""));
    setFormUnitNumber(String(p.unitNumber || ""));
    setFormAvailableFrom(p.availableFrom || "");
    setFormTags(p.tags || "");
    setFormFurnishingDetails(p.furnishingDetails || "");
    setFormFurnishingStatus(p.furnishingStatus || "");
    setFormAgentName(p.agentName || "");
    setFormAgentPhotoUrl(p.agentPhotoUrl || "");
    setFormAmenities(p.amenities ? p.amenities.split(",") : []);
    setShowForm(true);
    if (
      p.buildingType ||
      p.city ||
      p.flooring ||
      p.tags ||
      p.furnishingDetails
    ) {
      setShowAdvanced(true);
    }
  };

  const handleSave = async () => {
    if (!formTitle || !formDescription || !formLocation) {
      alert("Title, description, and location are required.");
      return;
    }
    setSaving(true);
    const propertyData: Partial<Property> = {
      title: formTitle,
      description: formDescription,
      location: formLocation,
      price: formPrice ? Number(formPrice) : 0,
      rentAmount: formRentAmount ? Number(formRentAmount) : 0,
      size: formSize,
      type: formType,
      status: formStatus,
      imageUrl: formImageUrl || undefined,
      brochureUrl: formBrochureUrl || undefined,
      bedrooms: formBedrooms ? Number(formBedrooms) : undefined,
      bathrooms: formBathrooms ? Number(formBathrooms) : undefined,
      sqft: formSqft ? Number(formSqft) : undefined,
      featured: formFeatured,
      buildingType: formBuildingType,
      propertyCategory: formPropertyCategory,
      city: formCity,
      microMarket: formMicroMarket,
      locality: formLocality,
      flooring: formFlooring,
      floorNumber: formFloorNumber ? Number(formFloorNumber) : undefined,
      totalFloors: formTotalFloors ? Number(formTotalFloors) : undefined,
      unitNumber: formUnitNumber ? Number(formUnitNumber) : undefined,
      availableFrom: formAvailableFrom,
      tags: formTags,
      furnishingDetails: formFurnishingDetails,
      furnishingStatus: formFurnishingStatus,
      agentName: formAgentName,
      agentPhotoUrl: formAgentPhotoUrl,
      amenities: formAmenities.join(","),
    };

    const result = editingProperty?.id
      ? await updateProperty(editingProperty.id, propertyData)
      : await createProperty(propertyData);

    if (result) {
      await loadProperties();
      resetForm();
    } else {
      alert("Failed to save. Make sure you are logged in as admin.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this property?")) return;
    setDeletingId(id);
    const ok = await deleteProperty(id);
    if (ok) loadProperties();
    else alert("Failed to delete.");
    setDeletingId(null);
  };

  const handleMarkStatus = async (
    property: Property,
    newStatus: PropertyStatus,
  ) => {
    const ok = await updateProperty(Number(property.id), {
      ...property,
      status: newStatus,
    });
    if (ok) await loadProperties();
    else alert("Failed to update status.");
  };

  const filteredProperties =
    filterType === "ALL"
      ? properties
      : properties.filter((p) => p.type === filterType);

  const InputField = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    icon: Icon,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    type?: string;
    icon?: React.ElementType;
  }) => (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-1 text-xs font-medium text-gray-600">
        {Icon && <Icon size={12} />} {label}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 text-sm"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-syne text-accent-dark">
            Properties
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your real estate listings.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={loadProperties}
            disabled={loading}
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </Button>
          <Button
            className="gap-2 bg-accent-dark hover:bg-accent-dark/90 text-white"
            onClick={openCreateForm}
          >
            <Plus size={16} /> Add Property
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["ALL", "SALE", "RENT"].map((t) => (
          <Button
            key={t}
            variant={filterType === t ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType(t)}
            className={
              filterType === t ? "bg-accent-dark text-white" : "text-gray-600"
            }
          >
            {t === "ALL"
              ? `All (${properties.length})`
              : t === "SALE"
                ? `For Sale (${properties.filter((p) => p.type === PropertyType.SALE).length})`
                : `For Rent (${properties.filter((p) => p.type === PropertyType.RENT).length})`}
          </Button>
        ))}
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold font-syne text-accent-dark">
              {editingProperty ? "Edit Property" : "Add New Property"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Section 1: Core Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <InputField
              label="Title *"
              value={formTitle}
              onChange={setFormTitle}
              placeholder="e.g. 2BHK Builder Floor, Sec 23A"
            />
            <InputField
              label="Location *"
              value={formLocation}
              onChange={setFormLocation}
              placeholder="Panwar Housing, Gurgaon"
              icon={MapPin}
            />
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1 text-xs font-medium text-gray-600">
                <Tag size={12} /> Listing Type
              </Label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as PropertyType)}
                className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-accent-dark"
              >
                <option value={PropertyType.SALE}>🏷️ For Sale</option>
                <option value={PropertyType.RENT}>🔑 For Rent</option>
              </select>
            </div>
          </div>

          {/* Section 2: Price + Room Details */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            {formType === PropertyType.SALE ? (
              <InputField
                label="Sale Price (₹) *"
                value={formPrice}
                onChange={setFormPrice}
                placeholder="45000000"
                type="number"
              />
            ) : (
              <InputField
                label="Rent (₹/mo) *"
                value={formRentAmount}
                onChange={setFormRentAmount}
                placeholder="15500"
                type="number"
              />
            )}
            <InputField
              label="Bedrooms"
              value={formBedrooms}
              onChange={setFormBedrooms}
              placeholder="1"
              type="number"
              icon={Bed}
            />
            <InputField
              label="Bathrooms"
              value={formBathrooms}
              onChange={setFormBathrooms}
              placeholder="1"
              type="number"
              icon={Bath}
            />
            <InputField
              label="Area (sqft)"
              value={formSqft}
              onChange={setFormSqft}
              placeholder="520"
              type="number"
              icon={Maximize}
            />
            <InputField
              label="Size"
              value={formSize}
              onChange={setFormSize}
              placeholder="520 Sq.Ft."
            />
          </div>

          {/* Section 3: Image + Brochure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1 text-xs font-medium text-gray-600">
                <ImageIcon size={12} /> Image URL
              </Label>
              <Input
                value={formImageUrl}
                onChange={(e) => setFormImageUrl(e.target.value)}
                placeholder="https://example.com/property.jpg"
                className="h-9 text-sm"
              />
              {formImageUrl && (
                <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-gray-200 mt-1.5">
                  <Image
                    src={formImageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
            <InputField
              label="Brochure URL"
              value={formBrochureUrl}
              onChange={setFormBrochureUrl}
              placeholder="https://example.com/brochure.pdf"
              icon={FileDown}
            />
          </div>

          {/* Section 4: Featured + Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-600">
                Highlights / Tags
              </Label>
              <Input
                value={formTags}
                onChange={(e) => setFormTags(e.target.value)}
                placeholder="Prime Location, Well Maintained, Spacious, Affordable"
                className="h-9 text-sm"
              />
              <p className="text-[10px] text-gray-400">
                Comma-separated tags shown as badges
              </p>
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 cursor-pointer h-9">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${formFeatured ? "bg-accent-dark border-accent-dark" : "border-gray-300"}`}
                  onClick={() => setFormFeatured(!formFeatured)}
                >
                  {formFeatured && (
                    <CheckCircle size={14} className="text-white" />
                  )}
                </div>
                <span className="text-sm font-medium flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" /> Featured
                  Listing
                </span>
              </label>
              {editingProperty && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">
                    Status
                  </Label>
                  <select
                    value={formStatus}
                    onChange={(e) =>
                      setFormStatus(e.target.value as PropertyStatus)
                    }
                    className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-accent-dark"
                  >
                    <option value={PropertyStatus.AVAILABLE}>
                      ✅ Available
                    </option>
                    <option value={PropertyStatus.SOLD}>🔴 Sold</option>
                    <option value={PropertyStatus.RENTED}>🟡 Rented</option>
                    <option value={PropertyStatus.HIDDEN}>👁️ Hidden</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Advanced Details Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-sm text-accent-dark font-medium mb-4 hover:underline"
          >
            {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showAdvanced ? "Hide" : "Show"} Advanced Property Details
          </button>

          {showAdvanced && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-4 mb-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                    <Building2 size={12} /> Building Type
                  </Label>
                  <select
                    value={formBuildingType}
                    onChange={(e) => setFormBuildingType(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-accent-dark"
                  >
                    <option value="">Select...</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                    <Layers size={12} /> Property Type
                  </Label>
                  <select
                    value={formPropertyCategory}
                    onChange={(e) => setFormPropertyCategory(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-accent-dark"
                  >
                    <option value="">Select...</option>
                    <option value="Builder Floor">Builder Floor</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Studio">Studio</option>
                    <option value="Office Space">Office Space</option>
                    <option value="Shop">Shop</option>
                  </select>
                </div>
                <InputField
                  label="City"
                  value={formCity}
                  onChange={setFormCity}
                  placeholder="Gurgaon"
                />
                <InputField
                  label="Micro Market"
                  value={formMicroMarket}
                  onChange={setFormMicroMarket}
                  placeholder="Central Gurgaon"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InputField
                  label="Locality"
                  value={formLocality}
                  onChange={setFormLocality}
                  placeholder="Sector 23A"
                />
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">
                    Flooring
                  </Label>
                  <select
                    value={formFlooring}
                    onChange={(e) => setFormFlooring(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-accent-dark"
                  >
                    <option value="">Select...</option>
                    <option value="Marble">Marble</option>
                    <option value="Tiles">Tiles</option>
                    <option value="Wooden">Wooden</option>
                    <option value="Vitrified">Vitrified</option>
                    <option value="Granite">Granite</option>
                  </select>
                </div>
                <InputField
                  label="Floor Number"
                  value={formFloorNumber}
                  onChange={setFormFloorNumber}
                  placeholder="2"
                  type="number"
                />
                <InputField
                  label="Total Floors"
                  value={formTotalFloors}
                  onChange={setFormTotalFloors}
                  placeholder="4"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InputField
                  label="Unit No."
                  value={formUnitNumber}
                  onChange={setFormUnitNumber}
                  placeholder="5"
                  type="number"
                />
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">
                    Available From
                  </Label>
                  <select
                    value={formAvailableFrom}
                    onChange={(e) => setFormAvailableFrom(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-accent-dark"
                  >
                    <option value="">Select...</option>
                    <option value="Immediately">Immediately</option>
                    <option value="Within 15 Days">Within 15 Days</option>
                    <option value="Within 1 Month">Within 1 Month</option>
                    <option value="Within 3 Months">Within 3 Months</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">
                    Furnishing Status
                  </Label>
                  <select
                    value={formFurnishingStatus}
                    onChange={(e) => setFormFurnishingStatus(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-accent-dark"
                  >
                    <option value="">Select...</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-600">
                  Furnishing Details
                </Label>
                <Input
                  value={formFurnishingDetails}
                  onChange={(e) => setFormFurnishingDetails(e.target.value)}
                  placeholder="1 Fan, 1 Geyser, 1 Light, 1 Modular Kitchen, 1 Chimney, 1 Bed, 1 Wardrobe"
                  className="h-9 text-sm"
                />
              </div>

              {/* Agent Info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">
                  Agent Info
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-600">
                      Agent Name
                    </Label>
                    <Input
                      value={formAgentName}
                      onChange={(e) => setFormAgentName(e.target.value)}
                      placeholder="Rahul Sharma"
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-600">
                      Agent Photo URL
                    </Label>
                    <Input
                      value={formAgentPhotoUrl}
                      onChange={(e) => setFormAgentPhotoUrl(e.target.value)}
                      placeholder="https://example.com/agent.jpg"
                      className="h-9 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities Multi-Select */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">
                  Amenities
                </Label>

                {/* Selected amenities as icon chips */}
                {formAmenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formAmenities.map((amenity) => {
                      const Icon = getAmenityIcon(amenity);
                      return (
                        <span
                          key={amenity}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-dark/10 text-accent-dark text-sm font-medium border border-accent-dark/20"
                        >
                          <Icon size={14} />
                          {amenity}
                          <button
                            type="button"
                            onClick={() => removeAmenity(amenity)}
                            className="ml-1 hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Default amenity grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {AMENITY_OPTIONS.map((amenity) => {
                    const Icon = getAmenityIcon(amenity);
                    return (
                      <label
                        key={amenity}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-colors ${
                          formAmenities.includes(amenity)
                            ? "border-accent-dark bg-accent-dark/5 text-accent-dark font-medium"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="rounded border-gray-300 text-accent-dark focus:ring-accent-dark hidden"
                        />
                        <Icon size={16} className="flex-shrink-0" />
                        {amenity}
                      </label>
                    );
                  })}
                </div>

                {/* Add Custom Amenity */}
                <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                    Add Custom Amenity
                  </p>
                  <div className="flex items-center gap-2">
                    {/* Icon picker button */}
                    <div className="relative" ref={iconPickerRef}>
                      <button
                        type="button"
                        onClick={() => setShowIconPicker(!showIconPicker)}
                        className="h-9 w-9 flex items-center justify-center rounded-lg border border-gray-300 hover:border-accent-dark transition-colors bg-white"
                        title="Pick an icon"
                      >
                        {(() => {
                          const PickedIcon = ICON_PICKER_OPTIONS.find(
                            (o) => o.name === customAmenityIcon,
                          )?.icon;
                          return PickedIcon ? <PickedIcon size={16} /> : null;
                        })()}
                      </button>
                      {showIconPicker && (
                        <div className="absolute left-0 top-11 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-3 w-72 max-h-60 overflow-y-auto">
                          <p className="text-xs text-gray-400 mb-2 font-medium">
                            Choose an icon
                          </p>
                          <div className="grid grid-cols-7 gap-1">
                            {ICON_PICKER_OPTIONS.map((opt) => (
                              <button
                                key={opt.name}
                                type="button"
                                onClick={() => {
                                  setCustomAmenityIcon(opt.name);
                                  setShowIconPicker(false);
                                }}
                                className={`p-2 rounded-lg hover:bg-accent-dark/10 transition-colors ${
                                  customAmenityIcon === opt.name
                                    ? "bg-accent-dark/15 text-accent-dark"
                                    : "text-gray-500"
                                }`}
                                title={opt.name}
                              >
                                <opt.icon size={16} />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Input
                      value={customAmenityName}
                      onChange={(e) => setCustomAmenityName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomAmenity();
                        }
                      }}
                      placeholder="e.g. Rooftop Lounge"
                      className="h-9 text-sm flex-1"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={addCustomAmenity}
                      disabled={!customAmenityName.trim()}
                      className="h-9 px-4"
                    >
                      <Plus size={14} className="mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-1.5 mb-4">
            <Label className="text-xs font-medium text-gray-600">
              Description *
            </Label>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Detailed property description..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-accent-dark resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button
              className="bg-accent-dark hover:bg-accent-dark/90 text-white gap-2"
              onClick={handleSave}
              disabled={saving}
            >
              {saving && <RefreshCw size={14} className="animate-spin" />}
              {editingProperty ? "Update Property" : "Create Property"}
            </Button>
          </div>
        </div>
      )}

      {/* Property Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Location / Details</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price / Rent</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <RefreshCw
                    size={20}
                    className="animate-spin mx-auto text-gray-400"
                  />
                </TableCell>
              </TableRow>
            ) : filteredProperties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-gray-400 text-sm">
                    No properties found. Add one above!
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                      {property.imageUrl ? (
                        <Image
                          src={property.imageUrl}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon size={14} className="text-gray-300" />
                        </div>
                      )}
                      {property.featured && (
                        <div className="absolute top-0 right-0 bg-yellow-400 rounded-bl p-0.5">
                          <Star size={8} className="text-white" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-accent-dark max-w-[200px]">
                    <div className="flex items-center gap-1">
                      <span className="truncate">{property.title}</span>
                      {property.featured && (
                        <Star
                          size={10}
                          className="text-yellow-500 fill-yellow-500 shrink-0"
                        />
                      )}
                    </div>
                    {property.tags && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {property.tags
                          .split(",")
                          .slice(0, 3)
                          .map((tag, i) => (
                            <span
                              key={i}
                              className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent-dark/10 text-accent-dark"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div>{property.location}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                      {property.bedrooms && (
                        <span className="flex items-center gap-0.5">
                          <Bed size={10} />
                          {property.bedrooms}
                        </span>
                      )}
                      {property.bathrooms && (
                        <span className="flex items-center gap-0.5">
                          <Bath size={10} />
                          {property.bathrooms}
                        </span>
                      )}
                      {property.sqft && (
                        <span className="flex items-center gap-0.5">
                          <Maximize size={10} />
                          {property.sqft}ft²
                        </span>
                      )}
                      {property.floorNumber && (
                        <span>
                          Floor {property.floorNumber}/
                          {property.totalFloors || "?"}
                        </span>
                      )}
                    </div>
                    {property.propertyCategory && (
                      <span className="text-[10px] text-gray-400">
                        {property.propertyCategory}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${property.type === PropertyType.SALE ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                    >
                      {property.type === PropertyType.SALE ? "Sale" : "Rent"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        property.status === PropertyStatus.AVAILABLE
                          ? "bg-green-100 text-green-700"
                          : property.status === PropertyStatus.SOLD
                            ? "bg-red-100 text-red-700"
                            : property.status === PropertyStatus.RENTED
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {property.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {property.type === PropertyType.SALE
                      ? property.price
                        ? `₹${Number(property.price).toLocaleString("en-IN")}`
                        : "—"
                      : property.rentAmount
                        ? `₹${Number(property.rentAmount).toLocaleString("en-IN")}/mo`
                        : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {property.status === PropertyStatus.AVAILABLE && (
                        <>
                          {property.type === PropertyType.SALE && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-red-600 hover:bg-red-50"
                              onClick={() =>
                                handleMarkStatus(property, PropertyStatus.SOLD)
                              }
                            >
                              Sold
                            </Button>
                          )}
                          {property.type === PropertyType.RENT && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-orange-600 hover:bg-orange-50"
                              onClick={() =>
                                handleMarkStatus(
                                  property,
                                  PropertyStatus.RENTED,
                                )
                              }
                            >
                              Rented
                            </Button>
                          )}
                        </>
                      )}
                      {(property.status === PropertyStatus.SOLD ||
                        property.status === PropertyStatus.RENTED) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-green-600 hover:bg-green-50"
                          onClick={() =>
                            handleMarkStatus(property, PropertyStatus.AVAILABLE)
                          }
                        >
                          Re-list
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                        onClick={() => openEditForm(property)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:bg-red-50"
                        onClick={() =>
                          property.id && handleDelete(Number(property.id))
                        }
                        disabled={deletingId === Number(property.id)}
                      >
                        {deletingId === Number(property.id) ? (
                          <RefreshCw size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
