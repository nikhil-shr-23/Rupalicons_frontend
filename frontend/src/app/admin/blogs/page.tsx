"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "The Future of Luxury Living in Gurgaon",
    author: "Rupali Homes Team",
    date: "Feb 15, 2026",
    category: "Real Estate",
  },
  {
    id: 2,
    title: "Sustainable Architecture: A Modern Necessity",
    author: "John Doe",
    date: "Feb 10, 2026",
    category: "Architecture",
  },
  {
    id: 3,
    title: "Interior Design Trends for 2026",
    author: "Jane Smith",
    date: "Jan 28, 2026",
    category: "Interior Design",
  },
];

export default function AdminBlogs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-syne text-accent-dark">
            Blogs
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your journal entries and articles.
          </p>
        </div>
        <Button className="gap-2 bg-accent-dark hover:bg-accent-dark/90 text-white">
          <Plus size={16} /> Add New Blog
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium text-accent-dark">
                  {blog.title}
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                    {blog.category}
                  </span>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.date}</TableCell>
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
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
