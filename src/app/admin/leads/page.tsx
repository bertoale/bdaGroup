"use client";

import React, { useState, useEffect } from "react";
import { Lead } from "@/db/schema";
import {
  Inbox,
  Search,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  User,
  Loader2,
  ExternalLink,
  Tag,
  RefreshCw,
} from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, closed: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("q", searchQuery);
      if (statusFilter) params.append("status", statusFilter);
      if (topicFilter) params.append("topic", topicFilter);

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.data.leads);
        setStats(data.data.stats);
      } else {
        showToast("error", data.error || "Gagal mengambil data leads.");
      }
    } catch {
      showToast("error", "Terjadi kesalahan jaringan saat mengambil data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, statusFilter, topicFilter]);

  const handleUpdateStatus = async (leadId: number, newStatus: "new" | "contacted" | "closed") => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", `Status lead berhasil diubah menjadi ${newStatus}.`);
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
        fetchLeads();
      } else {
        showToast("error", data.error || "Gagal memperbarui status lead.");
      }
    } catch {
      showToast("error", "Terjadi kesalahan saat memperbarui status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLead = async (leadId: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data pesan lead ini?")) return;

    try {
      const res = await fetch(`/api/admin/leads?id=${leadId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Pesan lead berhasil dihapus.");
        if (selectedLead?.id === leadId) setSelectedLead(null);
        fetchLeads();
      } else {
        showToast("error", data.error || "Gagal menghapus pesan lead.");
      }
    } catch {
      showToast("error", "Gagal memproses penghapusan.");
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl border text-sm font-semibold flex items-center gap-3 transition-all ${
            notification.type === "success"
              ? "bg-emerald-600 text-white border-emerald-500"
              : "bg-rose-600 text-white border-rose-500"
          }`}
        >
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight flex items-center gap-3">
            <Inbox className="size-7 text-brand-gold" />
            <span>Inquiry & Lead Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola seluruh pesan masuk dari halaman Contact Us website Best Deals Asia Group.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all shadow-xs cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Inquiries
            </span>
            <span className="p-2 rounded-xl bg-slate-100 text-brand-navy">
              <Inbox className="size-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-brand-navy">{stats.total}</h3>
          <p className="text-[11px] text-slate-500">Semua pesan tersimpan</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              Pesan Baru
            </span>
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Clock className="size-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-amber-600">{stats.new}</h3>
          <p className="text-[11px] text-amber-700">Belum dihubungi</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
              Sudah Dihubungi
            </span>
            <span className="p-2 rounded-xl bg-blue-100 text-blue-800">
              <Phone className="size-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-blue-600">{stats.contacted}</h3>
          <p className="text-[11px] text-blue-700">Dalam proses follow-up</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Selesai / Closed
            </span>
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="size-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-emerald-600">{stats.closed}</h3>
          <p className="text-[11px] text-emerald-700">Pesan selesai ditangani</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, email, no HP, atau isi pesan..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/10 focus:border-brand-navy"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand-navy"
          >
            <option value="">Semua Status</option>
            <option value="new">Baru (New)</option>
            <option value="contacted">Dihubungi (Contacted)</option>
            <option value="closed">Selesai (Closed)</option>
          </select>

          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand-navy max-w-[160px]"
          >
            <option value="">Semua Topik</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Vacation Rentals">Vacation Rentals</option>
            <option value="Property Management">Property Management</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Project & Maintenance">Project & Maintenance</option>
            <option value="Function & Event">Function & Event</option>
            <option value="Digital Solutions">Digital Solutions</option>
          </select>
        </div>
      </div>

      {/* Leads Table & Details Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table List (8 Cols on Desktop) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Daftar Pesan Masuk ({leads.length})
            </span>
          </div>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="size-8 animate-spin text-brand-navy" />
              <span className="text-xs">Memuat data leads...</span>
            </div>
          ) : leads.length === 0 ? (
            <div className="py-20 text-center space-y-2">
              <Inbox className="size-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">Tidak ada pesan masuk</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Belum ada data leads yang cocok dengan kriteria filter saat ini.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-4">Pengirim</th>
                    <th className="py-3.5 px-4">Topik</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Tanggal</th>
                    <th className="py-3.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => {
                    const isSelected = selectedLead?.id === lead.id;
                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                          isSelected ? "bg-brand-sand/60" : ""
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-brand-navy text-xs sm:text-sm">
                            {lead.fullName}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Mail className="size-3 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[180px]">{lead.email}</span>
                          </div>
                          {lead.phone && (
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                              <Phone className="size-3 text-slate-400 shrink-0" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700">
                            {lead.topic || "General"}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              lead.status === "new"
                                ? "bg-amber-100 text-amber-800"
                                : lead.status === "contacted"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "-"}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteLead(lead.id);
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus Pesan"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Lead Detail Sidebar (4 Cols on Desktop) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5 sticky top-24">
          {selectedLead ? (
            <>
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Detail Pesan Masuk #{selectedLead.id}
                  </span>
                  <h3 className="text-base font-extrabold text-brand-navy mt-0.5">
                    {selectedLead.fullName}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    selectedLead.status === "new"
                      ? "bg-amber-100 text-amber-800"
                      : selectedLead.status === "contacted"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {selectedLead.status}
                </span>
              </div>

              {/* Sender Details */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="size-4 text-brand-gold shrink-0" />
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="hover:text-brand-navy hover:underline font-medium truncate"
                  >
                    {selectedLead.email}
                  </a>
                </div>

                {selectedLead.phone && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="size-4 text-brand-gold shrink-0" />
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-navy hover:underline font-medium"
                    >
                      {selectedLead.phone}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-3 text-slate-600">
                  <Tag className="size-4 text-brand-gold shrink-0" />
                  <span className="font-medium text-brand-navy">Topik: {selectedLead.topic}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <Calendar className="size-4 shrink-0" />
                  <span>
                    Diterima pada:{" "}
                    {selectedLead.createdAt
                      ? new Date(selectedLead.createdAt).toLocaleString("id-ID")
                      : "-"}
                  </span>
                </div>
              </div>

              {/* Message Box */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Isi Pesan:
                </label>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>

              {/* Quick Actions / Status Updater */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Ubah Status Follow-Up:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedLead.id, "new")}
                    disabled={isUpdating || selectedLead.status === "new"}
                    className="px-2.5 py-2 rounded-xl text-xs font-bold border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors disabled:opacity-40"
                  >
                    New
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedLead.id, "contacted")}
                    disabled={isUpdating || selectedLead.status === "contacted"}
                    className="px-2.5 py-2 rounded-xl text-xs font-bold border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors disabled:opacity-40"
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedLead.id, "closed")}
                    disabled={isUpdating || selectedLead.status === "closed"}
                    className="px-2.5 py-2 rounded-xl text-xs font-bold border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors disabled:opacity-40"
                  >
                    Closed
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={`mailto:${selectedLead.email}?subject=Follow Up: ${selectedLead.topic || "Best Deals Asia Group"}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold transition-all"
                >
                  <Mail className="size-3.5" />
                  <span>Balas Email</span>
                </a>

                {selectedLead.phone && (
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                  >
                    <MessageSquare className="size-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </>
          ) : (
            <div className="py-16 text-center space-y-2">
              <Inbox className="size-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-700">Pilih salah satu pesan</p>
              <p className="text-[11px] text-slate-400">
                Klik baris tabel di sebelah kiri untuk melihat rincian isi pesan dan melakukan follow-up.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
