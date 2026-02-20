"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { fetchProperties, deleteProperty } from "@/lib/api";
import { Property, PropertyType, PropertyStatus } from "@/types";
import Image from "next/image";

export default function AdminProjects() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await fetchProperties(0, 50); // Fetch more items for admin view
      if (data && data.content) {
        setProperties(data.content);
      }
    } catch (error) {
      console.error("Failed to load properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      const success = await deleteProperty(id);
      if (success) {
        loadProperties(); // Reload list
      } else {
        alert("Failed to delete property");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-syne text-accent-dark">
            Properties
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your real estate listings from the database.
          </p>
        </div>
        <Button className="gap-2 bg-accent-dark hover:bg-accent-dark/90 text-white">
          <Plus size={16} /> Add New Property
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Loading properties...
                </TableCell>
              </TableRow>
            ) : properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No properties found.
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
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
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-accent-dark">
                    <div>{property.title}</div>
                  </TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        property.type === PropertyType.SALE
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {property.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        property.status === PropertyStatus.AVAILABLE
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {property.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {property.price ? `₹${property.price}` : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => property.id && handleDelete(property.id)}
                      >
                        <Trash2 size={16} />
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
