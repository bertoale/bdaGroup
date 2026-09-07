"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GrpJobPosition, GrpJobApplication } from "@/db/schema";
import { TiptapEditor } from "@/components/career/tiptap-editor";
import {
  Briefcase,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  FileText,
  X,
  Loader2,
  Check,
  Eye,
} from "lucide-react";

export default function AdminCareerPage() {
  const [activeTab, setActiveTab] = useState<"applications" | "positions">("applications");

  // Applications State
  const [applications, setApplications] = useState<GrpJobApplication[]>([]);
  const [appStats, setAppStats] = useState({
    total: 0,
    new: 0,
    reviewed: 0,
    accepted: 0,
    rejected: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [isLoadingApps, setIsLoadingApps] = useState(false);

  // Application Detail Modal
  const [selectedApp, setSelectedApp] = useState<GrpJobApplication | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [adminNotes, setAdminNotes] = useState<string>("");
  const [isUpdatingApp, setIsUpdatingApp] = useState(false);

  // Positions State
  const [positions, setPositions] = useState<GrpJobPosition[]>([]);
  const [posStats, setPosStats] = useState({ total: 0, active: 0, closed: 0 });
  const [isLoadingPositions, setIsLoadingPositions] = useState(false);

  // Position Modal Form
  const [showPosModal, setShowPosModal] = useState(false);
  const [posId, setPosId] = useState<number | null>(null);
  const [posTitle, setPosTitle] = useState("");
  const [posStatus, setPosStatus] = useState<"active" | "closed">("active");
  const [posDescription, setPosDescription] = useState("");
  const [isSavingPos, setIsSavingPos] = useState(false);

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // Fetch Applications
  const fetchApplications = async () => {
    setIsLoadingApps(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("q", searchQuery);
      if (statusFilter) params.append("status", statusFilter);
      if (positionFilter) params.append("position", positionFilter);

      const res = await fetch(`/api/admin/career/applications?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.data.applications);
        setAppStats(data.data.stats.apps);
        setPosStats(data.data.stats.positions);
      }
    } catch (err: unknown) {
      console.error(err);
      showToast("error", "Failed to fetch applications.");
    } finally {
      setIsLoadingApps(false);
    }
  };

  // Fetch Positions
  const fetchPositions = async () => {
    setIsLoadingPositions(true);
    try {
      const res = await fetch("/api/admin/career/positions");
      const data = await res.json();
      if (data.success) {
        setPositions(data.data);
      }
    } catch (err: unknown) {
      console.error(err);
      showToast("error", "Failed to fetch positions.");
    } finally {
      setIsLoadingPositions(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoadingApps(true);
      setIsLoadingPositions(true);
      try {
        const [appRes, posRes] = await Promise.all([
          fetch("/api/admin/career/applications"),
          fetch("/api/admin/career/positions"),
        ]);
        const appData = await appRes.json();
        const posData = await posRes.json();

        if (isMounted) {
          if (appData.success) {
            setApplications(appData.data.applications);
            setAppStats(appData.data.stats.apps);
            setPosStats(appData.data.stats.positions);
          }
          if (posData.success) {
            setPositions(posData.data);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setIsLoadingApps(false);
          setIsLoadingPositions(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchApplications();
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, statusFilter, positionFilter]);

  // Handle Application Detail
  const handleOpenAppDetail = (app: GrpJobApplication) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setAdminNotes(app.adminNotes || "");
  };

  const handleUpdateAppStatus = async () => {
    if (!selectedApp) return;
    setIsUpdatingApp(true);
    try {
      const res = await fetch("/api/admin/career/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedApp.id,
          status: newStatus,
          adminNotes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", `Application status updated to ${newStatus}.`);
        setSelectedApp(null);
        fetchApplications();
      } else {
        throw new Error(data.error);
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      showToast("error", e.message || "Failed to update application.");
    } finally {
      setIsUpdatingApp(false);
    }
  };

  const handleDeleteApp = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job application?")) return;
    try {
      const res = await fetch(`/api/admin/career/applications?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Application deleted successfully.");
        if (selectedApp?.id === id) setSelectedApp(null);
        fetchApplications();
      }
    } catch (err: unknown) {
      console.error(err);
      showToast("error", "Failed to delete application.");
    }
  };

  // Handle Position Modal
  const handleOpenNewPos = () => {
    setPosId(null);
    setPosTitle("");
    setPosStatus("active");
    setPosDescription("");
    setShowPosModal(true);
  };

  const handleEditPos = (pos: GrpJobPosition) => {
    setPosId(pos.id);
    setPosTitle(pos.title);
    setPosStatus(pos.status);
    setPosDescription(pos.description);
    setShowPosModal(true);
  };

  const handleSavePosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!posTitle.trim() || !posDescription.trim()) {
      showToast("error", "Please enter job title and description.");
      return;
    }

    setIsSavingPos(true);
    try {
      const res = await fetch("/api/admin/career/positions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: posId,
          title: posTitle,
          status: posStatus,
          description: posDescription,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", posId ? "Position updated!" : "Position created!");
        setShowPosModal(false);
        fetchPositions();
        fetchApplications();
      } else {
        throw new Error(data.error);
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      showToast("error", e.message || "Failed to save position.");
    } finally {
      setIsSavingPos(false);
    }
  };

  const handleTogglePosStatus = async (id: number) => {
    try {
      const res = await fetch("/api/admin/career/positions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "toggle" }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", `Position status changed to ${data.data.status}`);
        fetchPositions();
        fetchApplications();
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to change status.");
    }
  };

  const handleDeletePos = async (id: number) => {
    if (!confirm("Are you sure you want to delete this position vacancy?")) return;
    try {
      const res = await fetch(`/api/admin/career/positions?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Position deleted successfully.");
        fetchPositions();
        fetchApplications();
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to delete position.");
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2.5 rounded-xl bg-brand-sand text-brand-navy">
                <Briefcase className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl font-black text-brand-navy tracking-tight">
                  Career & Recruitment Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Best Deals Asia Group • Manage candidate CVs and configure job vacancies
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/career"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Public Page</span>
            </Link>

            {activeTab === "positions" && (
              <button
                type="button"
                onClick={handleOpenNewPos}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-amber-400 text-brand-navy text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Position</span>
              </button>
            )}
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between text-sm font-medium transition-all ${
              notification.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-rose-50 text-rose-900 border border-rose-200"
            }`}
          >
            <span>{notification.message}</span>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-slate-500 hover:text-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("applications")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "applications"
                ? "bg-brand-navy text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Applicant Submissions</span>
            {appStats.new > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px]">
                {appStats.new} New
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("positions")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "positions"
                ? "bg-brand-navy text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Job Positions</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px]">
              {posStats.total}
            </span>
          </button>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: APPLICANT FORM SUBMISSIONS */}
        {/* ==================================================== */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Total Applicants
                </p>
                <h3 className="text-2xl font-black text-brand-navy mt-1">{appStats.total}</h3>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-sm">
                <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  New Submissions
                </p>
                <h3 className="text-2xl font-black text-amber-600 mt-1">{appStats.new}</h3>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sky-200 bg-sky-50/20 shadow-sm">
                <p className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">
                  Reviewed
                </p>
                <h3 className="text-2xl font-black text-sky-600 mt-1">{appStats.reviewed}</h3>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm">
                <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  Accepted
                </p>
                <h3 className="text-2xl font-black text-emerald-600 mt-1">{appStats.accepted}</h3>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-sm">
                <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
                  Rejected
                </p>
                <h3 className="text-2xl font-black text-rose-600 mt-1">{appStats.rejected}</h3>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, email, phone..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-navy focus:bg-white transition-all"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none font-semibold text-slate-700"
                >
                  <option value="">All Statuses</option>
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none font-semibold text-slate-700"
                >
                  <option value="">All Positions</option>
                  {positions.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-4 px-5">Candidate</th>
                      <th className="py-4 px-5">Position</th>
                      <th className="py-4 px-5">Contact</th>
                      <th className="py-4 px-5">CV File</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5">Applied Date</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoadingApps ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                          <span>Loading applicant data...</span>
                        </td>
                      </tr>
                    ) : applications.length > 0 ? (
                      applications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-5 font-bold text-slate-800 text-sm">
                            {app.name}
                          </td>
                          <td className="py-4 px-5 font-semibold text-brand-navy">
                            {app.jobTitle}
                          </td>
                          <td className="py-4 px-5 space-y-0.5">
                            <div>{app.email}</div>
                            <div className="text-slate-400">{app.phone}</div>
                          </td>
                          <td className="py-4 px-5">
                            {app.cvPath ? (
                              <a
                                href={app.cvPath}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all text-[11px]"
                              >
                                <FileText className="w-3.5 h-3.5 text-rose-500" />
                                <span>PDF CV</span>
                              </a>
                            ) : (
                              <span className="text-slate-400 italic">No CV</span>
                            )}
                          </td>
                          <td className="py-4 px-5">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                app.status === "new"
                                  ? "bg-amber-100 text-amber-800"
                                  : app.status === "reviewed"
                                  ? "bg-sky-100 text-sky-800"
                                  : app.status === "accepted"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-slate-400">
                            {app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-GB") : "-"}
                          </td>
                          <td className="py-4 px-5 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => handleOpenAppDetail(app)}
                              className="p-1.5 rounded-lg hover:bg-brand-sand text-brand-navy transition-colors inline-block"
                              title="Review Application"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteApp(app.id)}
                              className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors inline-block"
                              title="Delete Application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No applications found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: JOB POSITIONS */}
        {/* ==================================================== */}
        {activeTab === "positions" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Positions
                </p>
                <h3 className="text-2xl font-black text-brand-navy mt-1">{positions.length}</h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm">
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Active Openings
                </p>
                <h3 className="text-2xl font-black text-emerald-600 mt-1">
                  {positions.filter((p) => p.status === "active").length}
                </h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Closed Roles
                </p>
                <h3 className="text-2xl font-black text-slate-600 mt-1">
                  {positions.filter((p) => p.status === "closed").length}
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-4 px-5">Job Title</th>
                      <th className="py-4 px-5">Description Preview</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5">Created</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoadingPositions ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                          <span>Loading vacancies...</span>
                        </td>
                      </tr>
                    ) : positions.length > 0 ? (
                      positions.map((pos) => (
                        <tr key={pos.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-5 font-bold text-slate-800 text-sm">
                            {pos.title}
                          </td>
                          <td className="py-4 px-5 max-w-md">
                            <p className="line-clamp-2 text-slate-500">
                              {pos.description.replace(/<[^>]+>/g, " ")}
                            </p>
                          </td>
                          <td className="py-4 px-5">
                            <button
                              type="button"
                              onClick={() => handleTogglePosStatus(pos.id)}
                              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all ${
                                pos.status === "active"
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  pos.status === "active" ? "bg-emerald-600" : "bg-slate-500"
                                }`}
                              />
                              <span>{pos.status}</span>
                            </button>
                          </td>
                          <td className="py-4 px-5 text-slate-400">
                            {pos.createdAt ? new Date(pos.createdAt).toLocaleDateString("en-GB") : "-"}
                          </td>
                          <td className="py-4 px-5 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => handleEditPos(pos)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-brand-navy transition-colors inline-block"
                              title="Edit Position"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePos(pos.id)}
                              className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors inline-block"
                              title="Delete Position"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          No job positions configured. Click &quot;Add Position&quot; to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* MODAL: APPLICATION DETAIL & STATUS UPDATE */}
        {/* ==================================================== */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200">
              <div className="bg-brand-navy p-6 text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold">
                    Applicant Review
                  </span>
                  <h3 className="text-xl font-black">{selectedApp.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-bold">
                      Position Applied
                    </span>
                    <strong className="text-brand-navy font-bold">{selectedApp.jobTitle}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-bold">
                      Applied At
                    </span>
                    <span>
                      {selectedApp.createdAt
                        ? new Date(selectedApp.createdAt).toLocaleString("en-GB")
                        : "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-bold">
                      Email
                    </span>
                    <a
                      href={`mailto:${selectedApp.email}`}
                      className="text-brand-navy font-medium underline"
                    >
                      {selectedApp.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-bold">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 font-bold"
                    >
                      {selectedApp.phone} ↗
                    </a>
                  </div>
                </div>

                {selectedApp.cvPath && (
                  <div className="p-4 bg-brand-sand/50 rounded-2xl border border-amber-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-rose-500" />
                      <div>
                        <strong className="block text-brand-navy font-bold">Resume / CV Document</strong>
                        <span className="text-xs text-slate-500">PDF Document</span>
                      </div>
                    </div>
                    <a
                      href={selectedApp.cvPath}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-navy-light transition-colors"
                    >
                      Open PDF CV
                    </a>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Recruitment Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-brand-navy focus:bg-white"
                    >
                      <option value="new">New (Needs Review)</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="accepted">Accepted / Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Internal HR Notes
                    </label>
                    <textarea
                      rows={3}
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add recruiter interview remarks or qualification notes..."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-navy focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isUpdatingApp}
                  onClick={handleUpdateAppStatus}
                  className="px-5 py-2 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold flex items-center gap-2"
                >
                  {isUpdatingApp ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Save Status</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* MODAL: JOB POSITION FORM (TIPTAP EDITOR) */}
        {/* ==================================================== */}
        {showPosModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200">
              <div className="bg-brand-navy p-6 text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold">
                    Job Vacancy Setup
                  </span>
                  <h3 className="text-xl font-black">
                    {posId ? "Edit Position" : "Create New Position"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPosModal(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePosition} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Position Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={posTitle}
                      onChange={(e) => setPosTitle(e.target.value)}
                      placeholder="e.g. Villa Operations Supervisor"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-brand-navy focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Status <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={posStatus}
                      onChange={(e) => setPosStatus(e.target.value as "active" | "closed")}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-brand-navy focus:bg-white"
                    >
                      <option value="active">Active (Open)</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Role Overview & Qualifications (Tiptap Editor){" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <TiptapEditor
                    value={posDescription}
                    onChange={(html) => setPosDescription(html)}
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPosModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingPos}
                    className="px-6 py-2.5 rounded-xl bg-brand-gold hover:bg-amber-400 text-brand-navy text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm"
                  >
                    {isSavingPos ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    <span>Save Position</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
