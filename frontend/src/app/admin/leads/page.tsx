"use client";

import { useEffect, useMemo, useState } from "react";
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
  Filter,
  X,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchInquiries, deleteInquiry } from "@/lib/api";
import { Inquiry } from "@/types";
import { useAdminAuth } from "@/context/AdminAuthContext";

// ─── Filter Types ────────────────────────────────────────────────────────
interface LeadFilters {
  status: string[];
  type: string[];
  city: string[];
  dateFrom: string;
  dateTo: string;
}

const EMPTY_FILTERS: LeadFilters = {
  status: [],
  type: [],
  city: [],
  dateFrom: "",
  dateTo: "",
};

const STATUS_OPTIONS = ["NEW", "CONTACTED", "CLOSED"] as const;
const TYPE_OPTIONS = ["CONTACT", "SELL", "PROPERTY"] as const;

// ─── Reusable Filter Chip ────────────────────────────────────────────────
function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 whitespace-nowrap ${
        active
          ? "bg-accent-dark text-white border-accent-dark shadow-sm"
          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────
export default function LeadsPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filters, setFilters] = useState<LeadFilters>(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { isSuperAdmin } = useAdminAuth();

  // ── Data fetching ────────────────────────────────────────────────────
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

  // ── Delete handler ───────────────────────────────────────────────────
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

  // ── Derive unique cities from data ───────────────────────────────────
  const uniqueCities = useMemo(() => {
    const cities = new Set<string>();
    inquiries.forEach((inq) => {
      const city = (inq.city ?? "").trim();
      if (city) cities.add(city);
    });
    return Array.from(cities).sort((a, b) =>
      a.localeCompare(b, "en-IN", { sensitivity: "base" })
    );
  }, [inquiries]);

  // ── Active filter count ──────────────────────────────────────────────
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status.length > 0) count++;
    if (filters.type.length > 0) count++;
    if (filters.city.length > 0) count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    return count;
  }, [filters]);

  // ── Filter toggle helpers ────────────────────────────────────────────
  const toggleFilter = (
    key: "status" | "type" | "city",
    value: string
  ): void => {
    setFilters((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const clearAllFilters = (): void => {
    setFilters(EMPTY_FILTERS);
    setSearch("");
  };

  // ── Filtered + searched results ──────────────────────────────────────
  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      // Status filter
      if (
        filters.status.length > 0 &&
        !filters.status.includes(inq.status ?? "")
      ) {
        return false;
      }

      // Type filter
      if (
        filters.type.length > 0 &&
        !filters.type.includes(inq.type ?? "")
      ) {
        return false;
      }

      // City filter
      if (filters.city.length > 0) {
        const inqCity = (inq.city ?? "").trim();
        if (!filters.city.includes(inqCity)) return false;
      }

      // Date range filter
      if (filters.dateFrom) {
        const from = new Date(filters.dateFrom);
        const created = new Date(inq.createdAt);
        if (created < from) return false;
      }
      if (filters.dateTo) {
        const to = new Date(filters.dateTo);
        to.setHours(23, 59, 59, 999);
        const created = new Date(inq.createdAt);
        if (created > to) return false;
      }

      // Text search
      if (search.trim()) {
        const searchTerm = search.toLowerCase();
        return (
          (inq.name ?? "").toLowerCase().includes(searchTerm) ||
          (inq.email ?? "").toLowerCase().includes(searchTerm) ||
          (inq.phone ?? "").includes(search) ||
          (inq.location ?? "").toLowerCase().includes(searchTerm)
        );
      }

      return true;
    });
  }, [inquiries, filters, search]);

  // ── Format date ──────────────────────────────────────────────────────
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

  // ── Status badge color ───────────────────────────────────────────────
  const statusColor = (status?: string): string => {
    switch (status) {
      case "NEW":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "CONTACTED":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "CLOSED":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  // ── CSV export (uses filtered data) ──────────────────────────────────
  const handleExportCsv = (): void => {
    try {
      const escapeCsv = (value?: string | number | null): string => {
        const str = value == null ? "" : String(value);
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      const header =
        "ID,Name,Phone,Email,Type,Status,City,Location,Message,Created At";
      const rows = filtered.map((inq) =>
        [
          escapeCsv(inq.id),
          escapeCsv(inq.name),
          escapeCsv(inq.phone),
          escapeCsv(inq.email),
          escapeCsv(inq.type),
          escapeCsv(inq.status),
          escapeCsv(inq.city),
          escapeCsv(inq.location),
          escapeCsv(inq.message),
          escapeCsv(inq.createdAt ? formatDate(inq.createdAt) : ""),
        ].join(",")
      );

      const csvContent = [header, ...rows].join("\n");
      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });
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
            {filtered.length === inquiries.length
              ? `${inquiries.length} total lead${inquiries.length !== 1 ? "s" : ""}`
              : `${filtered.length} of ${inquiries.length} lead${inquiries.length !== 1 ? "s" : ""}`}{" "}
            from the contact form.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExportCsv}
            disabled={loading || filtered.length === 0}
            title="Export filtered leads as CSV"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export CSV</span>
            {filtered.length !== inquiries.length && filtered.length > 0 && (
              <span className="ml-1 text-[10px] bg-accent-dark text-white rounded-full px-1.5 py-0.5">
                {filtered.length}
              </span>
            )}
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

      {/* Search + Filter Toggle Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
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
        <div className="flex items-center gap-2">
          <Button
            variant={filtersOpen ? "default" : "outline"}
            className="gap-2"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <Filter size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 text-[10px] bg-white text-accent-dark rounded-full px-1.5 py-0.5 font-bold">
                {activeFilterCount}
              </span>
            )}
            {filtersOpen ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </Button>
          {(activeFilterCount > 0 || search) && (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-500 gap-1"
              onClick={clearAllFilters}
            >
              <X size={14} />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {filtersOpen && (
        <Card className="border-dashed">
          <CardContent className="p-4 space-y-4">
            {/* Status */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Status
              </p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <FilterChip
                    key={s}
                    label={s.charAt(0) + s.slice(1).toLowerCase()}
                    active={filters.status.includes(s)}
                    onClick={() => toggleFilter("status", s)}
                  />
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Inquiry Type
              </p>
              <div className="flex flex-wrap gap-2">
                {TYPE_OPTIONS.map((t) => (
                  <FilterChip
                    key={t}
                    label={t.charAt(0) + t.slice(1).toLowerCase()}
                    active={filters.type.includes(t)}
                    onClick={() => toggleFilter("type", t)}
                  />
                ))}
              </div>
            </div>

            {/* City */}
            {uniqueCities.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  City
                </p>
                <div className="flex flex-wrap gap-2">
                  {uniqueCities.map((c) => (
                    <FilterChip
                      key={c}
                      label={c}
                      active={filters.city.includes(c)}
                      onClick={() => toggleFilter("city", c)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Date Range */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Date Range
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateFrom: e.target.value,
                      }))
                    }
                    className="w-40 text-sm"
                    placeholder="From"
                  />
                </div>
                <span className="text-gray-400 text-xs">to</span>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateTo: e.target.value,
                      }))
                    }
                    className="w-40 text-sm"
                    placeholder="To"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filter Tags (always visible when filters active) */}
      {!filtersOpen && activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400">Active filters:</span>
          {filters.status.map((s) => (
            <span
              key={`tag-status-${s}`}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
            >
              {s.charAt(0) + s.slice(1).toLowerCase()}
              <button
                type="button"
                onClick={() => toggleFilter("status", s)}
                className="hover:text-blue-900"
              >
                <X size={10} />
              </button>
            </span>
          ))}
          {filters.type.map((t) => (
            <span
              key={`tag-type-${t}`}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200"
            >
              {t.charAt(0) + t.slice(1).toLowerCase()}
              <button
                type="button"
                onClick={() => toggleFilter("type", t)}
                className="hover:text-purple-900"
              >
                <X size={10} />
              </button>
            </span>
          ))}
          {filters.city.map((c) => (
            <span
              key={`tag-city-${c}`}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              {c}
              <button
                type="button"
                onClick={() => toggleFilter("city", c)}
                className="hover:text-emerald-900"
              >
                <X size={10} />
              </button>
            </span>
          ))}
          {filters.dateFrom && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-orange-50 text-orange-700 border border-orange-200">
              From: {filters.dateFrom}
              <button
                type="button"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, dateFrom: "" }))
                }
                className="hover:text-orange-900"
              >
                <X size={10} />
              </button>
            </span>
          )}
          {filters.dateTo && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-orange-50 text-orange-700 border border-orange-200">
              To: {filters.dateTo}
              <button
                type="button"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, dateTo: "" }))
                }
                className="hover:text-orange-900"
              >
                <X size={10} />
              </button>
            </span>
          )}
        </div>
      )}

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
                    {search || activeFilterCount > 0
                      ? "No matching inquiries."
                      : "No inquiries yet."}
                  </p>
                  <p className="text-xs mt-1">
                    {search || activeFilterCount > 0
                      ? "Try adjusting your search or filters."
                      : "Inquiries from the contact form will appear here."}
                  </p>
                  {(search || activeFilterCount > 0) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 text-accent-dark"
                      onClick={clearAllFilters}
                    >
                      Clear all filters
                    </Button>
                  )}
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
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-medium hidden sm:inline ${statusColor(inq.status)}`}
                        >
                          {inq.status}
                        </span>
                        <span className="text-[10px] text-gray-400 hidden md:inline">
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
                              <RefreshCw
                                size={14}
                                className="animate-spin"
                              />
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

                  {/* Status + Type badges */}
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${statusColor(selectedInquiry.status)}`}
                    >
                      {selectedInquiry.status}
                    </span>
                    {selectedInquiry.type && (
                      <span className="text-[11px] px-2.5 py-1 rounded-full border font-medium bg-purple-50 text-purple-700 border-purple-200">
                        {selectedInquiry.type}
                      </span>
                    )}
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
                        selectedInquiry.id &&
                        handleDelete(selectedInquiry.id)
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
                  <p className="text-xs">
                    Click on an inquiry to see details
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
