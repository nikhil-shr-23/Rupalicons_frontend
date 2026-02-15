import Link from "next/link";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex flex-col">
        <div className="p-6 border-b border-navy-800">
          <Link href="/" className="text-2xl font-bold text-gold font-serif">
            RUPALI ADMIN
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center space-x-3 px-4 py-3 bg-navy-800 rounded-lg text-gold-400"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/add-brochure"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-navy-800 hover:text-white rounded-lg transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Brochure</span>
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-navy-800 hover:text-white rounded-lg transition-colors"
          >
            <FileText className="h-5 w-5" />
            <span>All Projects</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-navy-800 hover:text-white rounded-lg transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-navy-800">
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-navy-800 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
