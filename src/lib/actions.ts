"use server";

import { redirect } from "next/navigation";
import { setAdminSession, clearAdminSession, verifyPassword } from "./auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function loginAdminAction(prevState: { error?: string } | undefined, formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  try {
    // 1. Query user from MySQL users table in bdaGroup
    const foundUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const dbUser = foundUsers[0];
    if (!dbUser) {
      return {
        error: "Akun tidak ditemukan. Pastikan email yang dimasukkan terdaftar di sistem.",
      };
    }

    // 2. Verify Bcrypt password
    const isMatch = await verifyPassword(password, dbUser.password);
    if (!isMatch) {
      return { error: "Password yang Anda masukkan salah. Silakan coba lagi." };
    }

    // 3. Set encrypted HMAC session cookie
    await setAdminSession({
      email: dbUser.email,
      name: dbUser.name || "Administrator BDA Group",
      role: "admin",
      loggedInAt: Date.now(),
    });
  } catch (err: unknown) {
    const error = err as { message?: string };
    console.error("[AUTH ERROR] Login failed:", error);
    return { error: error.message || "Terjadi kesalahan server saat login." };
  }

  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/login");
}

export async function submitContactLeadAction(formData: {
  fullName: string;
  email: string;
  phone?: string;
  topic?: string;
  message: string;
}) {
  if (!formData.fullName || !formData.email || !formData.message) {
    return { success: false, error: "Name, email, and message are required." };
  }

  const { createLead } = await import("./lead-service");
  return await createLead({
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    topic: formData.topic,
    message: formData.message,
    source: "contact_us_page",
  });
}

