"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Trash2,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  MessageSquare,
  Search,
  ShieldAlert,
  Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchInquiries, deleteInquiry, getAuthHeader, API_URL } from "@/lib/api";
import { Inquiry } from "@/types";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function LeadsPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const { isSuperAdmin } = useAdminAuth();

  const loadData = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await fetchInquiries();
      setInquiries(data ?? []);
    } catch (error) {
      console.error("Failed to load inquiries:", error);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number): Promise<void> => {
    if (!confirm("Delete this inquiry?")) return;

    try {
      setDeletingId(id);

      const success = await deleteInquiry(id);

      if (success) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));

        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      } else {
        alert("Failed to delete inquiry.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete inquiry.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const searchTerm = search.toLowerCase();

    return (
      (inq.name ?? "").toLowerCase().includes(searchTerm) ||
      (inq.email ?? "").toLowerCase().includes(searchTerm) ||
      (inq.phone ?? "").includes(search) ||
      (inq.location ?? "").toLowerCase().includes(searchTerm)
    );
  });

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";

    const d = new Date(dateStr);

    if (isNaN(d.getTime())) return "—";

    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-syne text-accent-dark">
            Inquiries
          </h1>
          <p className="text-gray-500 mt-1">
            {inquiries.length} total lead{inquiries.length !== 1 && "s"} from
            the contact form.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={async () => {
              try {
                const res = await fetch(`${API_URL}/admin/leads/export/csv`, {
                  headers: { ...getAuthHeader() },
                });

                if (!res.ok) throw new Error("Export failed");

                const blob = await res.blob();
                const url = URL.createObjectURL(blob);

                try {
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "leads.csv";
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                } finally {
                  URL.revokeObjectURL(url);
                }
              } catch (error) {
                console.error("CSV export error:", error);
                alert("Failed to export CSV. Please try again.");
              }
            }}
            disabled={loading || inquiries.length === 0}
            title="Export CSV"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={loadData}
            disabled={loading}
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <Input
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiry List */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-50 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">
                    {search ? "No matching inquiries." : "No inquiries yet."}
                  </p>
                  <p className="text-xs mt-1">
                    Inquiries from the contact form will appear here.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filtered.map((inq) => (
                    <div
                      key={inq.id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={`flex items-center justify-between p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedInquiry?.id === inq.id
                          ? "bg-gray-50 border-l-2 border-accent-dark"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-gray-500">
                            {(inq.name ?? "")
                              .split(" ")
                              .filter(Boolean)
                              .map((n) => n.charAt(0))
                              .join("")
                              .toUpperCase()
                              .slice(0, 2) || "NA"}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {inq.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {inq.email || inq.phone || "No contact info"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-gray-400 hidden sm:inline">
                          {formatDate(inq.createdAt)}
                        </span>
                        {isSuperAdmin && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (inq.id) handleDelete(inq.id);
                            }}
                            disabled={deletingId === inq.id}
                          >
                            {deletingId === inq.id ? (
                              <RefreshCw size={14} className="animate-spin" />
                            ) : (
                              <Trash2 size={14} />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
              <CardDescription>
                {selectedInquiry
                  ? "Inquiry information"
                  : "Select an inquiry to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedInquiry ? (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Name
                    </p>
                    <p className="text-sm font-semibold">
                      {selectedInquiry.name}
                    </p>
                  </div>

                  {selectedInquiry.email && (
                    <div className="flex items-start gap-2">
                      <Mail size={14} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                          Email
                        </p>
                        <a
                          href={`mailto:${selectedInquiry.email}`}
                          className="text-sm text-accent-dark hover:underline"
                        >
                          {selectedInquiry.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedInquiry.phone && (
                    <div className="flex items-start gap-2">
                      <Phone size={14} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                          Phone
                        </p>
                        <a
                          href={`tel:${selectedInquiry.phone}`}
                          className="text-sm text-accent-dark hover:underline"
                        >
                          {selectedInquiry.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedInquiry.location && (
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                          Location
                        </p>
                        <p className="text-sm">{selectedInquiry.location}</p>
                      </div>
                    </div>
                  )}

                  {selectedInquiry.message && (
                    <div className="flex items-start gap-2">
                      <MessageSquare
                        size={14}
                        className="text-gray-400 mt-0.5"
                      />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                          Message
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {selectedInquiry.message}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400">
                      Received: {formatDate(selectedInquiry.createdAt)}
                    </p>
                  </div>

                  {isSuperAdmin ? (
                    <Button
                      variant="outline"
                      className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
                      onClick={() =>
                        selectedInquiry.id && handleDelete(selectedInquiry.id)
                      }
                      disabled={deletingId === selectedInquiry.id}
                    >
                      <Trash2 size={14} />
                      Delete Inquiry
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-lg p-3">
                      <ShieldAlert size={14} />
                      <span>Only Super Admins can delete inquiries</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-300">
                  <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">Click on an inquiry to see details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
