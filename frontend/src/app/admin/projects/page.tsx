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
import { Plus, Edit, Trash2, FileText, ExternalLink } from "lucide-react";
import { fetchProjects, deleteProject } from "@/lib/api";
import { Property } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects(0, 50); // Fetch more items for admin view
      if (data && data.content) {
        setProjects(data.content);
      }
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const success = await deleteProject(id);
      if (success) {
        loadProjects(); // Reload list
      } else {
        alert("Failed to delete project");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-syne text-accent-dark">
            Projects
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your real estate listings from the database.
          </p>
        </div>
        <Button className="gap-2 bg-accent-dark hover:bg-accent-dark/90 text-white">
          <Plus size={16} /> Add New Project
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Brochure</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading projects...
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.propertiesId}>
                  <TableCell>
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.projectName}
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
                    <div>{project.projectName}</div>
                    <div className="text-xs text-gray-500">
                      {project.devName}
                    </div>
                  </TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>
                    {project.CurrentPrice ? `₹${project.CurrentPrice}` : "N/A"}
                  </TableCell>
                  <TableCell>
                    {project.brochureUrl ? (
                      <a
                        href={project.brochureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
                      >
                        <FileText size={16} />
                        View PDF
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No Brochure</span>
                    )}
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
                        onClick={() =>
                          project.propertiesId &&
                          handleDelete(project.propertiesId)
                        }
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
