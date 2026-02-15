"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  ArrowUpRight,
  FileText,
  Building2,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-syne text-accent-dark">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Overview of your website's performance.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/projects">
            <Button className="gap-2 bg-accent-dark hover:bg-accent-dark/90">
              <Plus size={16} /> Add Project
            </Button>
          </Link>
          <Link href="/admin/blogs">
            <Button variant="outline" className="gap-2">
              <Plus size={16} /> Add Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Building2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500 mt-1">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Blogs</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500 mt-1">+3 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-emerald-500 mt-1 font-bold">
              +12% increase
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Visits</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-emerald-500 mt-1 font-bold">
              +8% increase
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity / Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>Latest contact form submissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        john@example.com
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs text-accent-dark"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your website content efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-between group">
              <span>Update Homepage Banner</span>
              <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            </Button>
            <Button variant="outline" className="w-full justify-between group">
              <span>Manage Services</span>
              <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            </Button>
            <Button variant="outline" className="w-full justify-between group">
              <span>Review Testimonials</span>
              <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
