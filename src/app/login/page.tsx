"use client";

import React, { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loginAdminAction } from "@/lib/actions";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[550px] h-[500px] bg-brand-navy/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[450px] bg-amber-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="relative size-12 shrink-0 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200 group-hover:scale-105 transition-transform">
              <Image
                src="/bda-logos2.gif"
                alt="Logo Best Deals Asia Group"
                width={40}
                height={40}
                priority
                className="object-contain size-full p-1.5"
              />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-lg tracking-tight text-brand-navy block">
                Best Deals Asia Group
              </span>
              <span className="text-xs text-brand-gold font-bold">
                Admin CMS Portal
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-500">
            Masuk dengan akun terdaftar untuk mengelola Lowongan Pekerjaan dan Rekrutmen
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 space-y-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold leading-relaxed">
                {state.error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Email Admin
              </label>
              <div className="relative">
                <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bestdealsasiagroup.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-brand-navy focus:bg-white transition-all text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-brand-navy focus:bg-white transition-all text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isPending ? "Memverifikasi..." : "Masuk ke Admin"}</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </form>

          {/* Security badge */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-[11px]">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>Sesi Terenkripsi & Dilindungi HMAC Cookie</span>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Best Deals Asia Group. All rights reserved.
        </p>
      </div>
    </div>
  );
}
