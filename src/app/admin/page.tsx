import React from "react";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { getCareerStatsAdmin } from "@/lib/career-service";
import {
  Briefcase,
  Users,
  FileText,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Plus,
  Inbox,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const stats = await getCareerStatsAdmin();

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-navy text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
            <ShieldCheck className="size-3.5" />
            <span>Sistem CMS Aktif</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Selamat Datang, {session?.name || "Administrator"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
            Portal Manajemen Pusat Best Deals Asia Group. Pantau statistik pelamar masuk dan kelola lowongan pekerjaan grup.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/career"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
          >
            <ExternalLink className="size-4" />
            <span>Lihat Website</span>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Pelamar
            </span>
            <span className="p-2 rounded-xl bg-slate-100 text-brand-navy">
              <Users className="size-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-brand-navy">{stats.apps.total}</h3>
          <p className="text-[11px] text-slate-500">Seluruh pelamar terdaftar</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              Lamaran Baru
            </span>
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <FileText className="size-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-amber-600">{stats.apps.new}</h3>
          <p className="text-[11px] text-amber-700">Perlu ditinjau tim HR</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Posisi Aktif
            </span>
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Briefcase className="size-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-emerald-600">{stats.positions.active}</h3>
          <p className="text-[11px] text-emerald-700">Lowongan terbuka publik</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Posisi
            </span>
            <span className="p-2 rounded-xl bg-slate-100 text-slate-600">
              <Briefcase className="size-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-slate-700">{stats.positions.total}</h3>
          <p className="text-[11px] text-slate-500">Termasuk posisi ditutup</p>
        </div>
      </div>

      {/* Module Shortcuts Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <h2 className="text-lg font-bold text-brand-navy tracking-tight">
            Modul Manajemen
          </h2>
          <p className="text-xs text-slate-500">
            Akses cepat ke pengelolaan data rekrutmen dan lowongan grup
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/career"
            className="p-5 rounded-2xl border border-slate-200 hover:border-brand-navy/40 hover:bg-slate-50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-brand-sand flex items-center justify-center text-brand-navy group-hover:scale-105 transition-transform">
                <Briefcase className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-brand-navy">
                  Career & Recruitment Management
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tinjau berkas CV pelamar dan atur lowongan pekerjaan aktif
                </p>
              </div>
            </div>
            <ArrowRight className="size-4 text-slate-400 group-hover:text-brand-navy group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/admin/leads"
            className="p-5 rounded-2xl border border-slate-200 hover:border-brand-navy/40 hover:bg-slate-50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-brand-sand flex items-center justify-center text-brand-navy group-hover:scale-105 transition-transform">
                <Inbox className="size-6 text-brand-gold" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-brand-navy">
                  Leads & Contact Inquiries
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lihat dan tindak lanjuti pesan masuk dari halaman Contact Us
                </p>
              </div>
            </div>
            <ArrowRight className="size-4 text-slate-400 group-hover:text-brand-navy group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
