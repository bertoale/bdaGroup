import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { logoutAdminAction } from "@/lib/actions";
import {
  Briefcase,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // Redirect to login if unauthenticated
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row font-sans">
      {/* Sidebar Desktop */}
      <aside className="w-full md:w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between p-5 md:min-h-screen relative z-20">
        <div className="space-y-6">
          {/* Logo Brand */}
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative size-10 shrink-0 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
              <Image
                src="/bda-logos2.gif"
                alt="Logo Best Deals Asia Group"
                width={32}
                height={32}
                className="object-contain size-full p-1"
              />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-brand-navy block">
                Best Deals Asia Group
              </span>
              <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider">
                Admin CMS Portal
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 block">
                Main Menu
              </span>
              <Link
                href="/admin"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-brand-navy hover:bg-slate-100 transition-all"
              >
                <Shield className="size-4 text-brand-navy" />
                <span>Dashboard</span>
              </Link>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 block">
                Recruitment & Jobs
              </span>
              <Link
                href="/admin/career"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-brand-navy hover:bg-slate-100 transition-all"
              >
                <Briefcase className="size-4 text-brand-navy" />
                <span>Career Management</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Sidebar Bottom Profile & Actions */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <Link
            href="/career"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-brand-navy bg-slate-50 border border-slate-200 transition-all"
          >
            <span>Lihat Career Publik</span>
            <ExternalLink className="size-3.5" />
          </Link>

          {/* Admin User Info Card */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="size-8 rounded-full bg-brand-sand border border-brand-gold/30 flex items-center justify-center text-brand-navy font-bold text-xs shrink-0">
                {session.name ? session.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-slate-800 block truncate">
                  {session.name || "Administrator"}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block truncate">
                  {session.email}
                </span>
              </div>
            </div>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                title="Keluar / Logout"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Shield className="size-3.5 text-emerald-500" />
            <span>Mode Admin Terotentikasi</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </header>

        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
