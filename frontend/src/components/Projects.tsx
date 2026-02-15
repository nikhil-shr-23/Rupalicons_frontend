"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchProjects } from "../lib/api";
import { Property } from "../types";

export default function Projects() {
  const [projects, setProjects] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        if (data && data.content) {
          setProjects(data.content);
        }
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section
        id="projects"
        className="py-20 bg-gray-50 flex justify-center items-center"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400"></div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-900 font-serif mb-4">
            Our Premium Projects
          </h2>
          <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of exceptional properties, designed with
            precision and tailored for sophisticated living.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p>No projects available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div
                key={project.propertiesId}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group"
              >
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.projectName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-navy-900/90 text-gold px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm backdrop-blur-sm">
                    {project.projectStage.replace(/_/g, " ")}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-900 mb-2 font-serif">
                    {project.projectName}
                  </h3>
                  <p className="text-gold-600 font-medium text-sm mb-4">
                    {project.location}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.Notes || "No description available."}
                  </p>
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {project.projectType}
                    </span>
                    <button className="text-navy-900 font-semibold hover:text-gold transition-colors text-sm uppercase tracking-wide flex items-center gap-2">
                      View Details
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
