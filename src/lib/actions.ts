"use server";

import { redirect } from "next/navigation";
import { setAdminSession, clearAdminSession, verifyPassword } from "./auth";

interface AdminUserConfig {
  email: string;
  password: string;
  name?: string;
}

/**
 * Retrieve admin users configured via environment variables.
 * Supports:
 * - Single admin: ADMIN_EMAIL & ADMIN_PASSWORD (optional ADMIN_NAME)
 * - Multiple admins: ADMIN_USERS (JSON array or comma-separated "email:password[:name]")
 */
function getEnvAdminUsers(): AdminUserConfig[] {
  const usersList: AdminUserConfig[] = [];

  // 1. Single admin configuration
  const singleEmail = process.env.ADMIN_EMAIL?.trim();
  const singlePassword = process.env.ADMIN_PASSWORD;
  if (singleEmail && singlePassword) {
    usersList.push({
      email: singleEmail.toLowerCase(),
      password: singlePassword,
      name: process.env.ADMIN_NAME?.trim() || "Administrator BDA Group",
    });
  }

  // 2. Optional multiple admins configuration
  const envUsers = process.env.ADMIN_USERS?.trim();
  if (envUsers) {
    try {
      if (envUsers.startsWith("[")) {
        const parsed = JSON.parse(envUsers);
        if (Array.isArray(parsed)) {
          for (const u of parsed) {
            if (u.email && u.password) {
              usersList.push({
                email: String(u.email).trim().toLowerCase(),
                password: String(u.password),
                name: u.name ? String(u.name) : undefined,
              });
            }
          }
        }
      } else {
        const entries = envUsers.split(",");
        for (const entry of entries) {
          const parts = entry.trim().split(":");
          if (parts.length >= 2) {
            usersList.push({
              email: parts[0].trim().toLowerCase(),
              password: parts[1].trim(),
              name: parts[2]?.trim(),
            });
          }
        }
      }
    } catch (err) {
      console.warn("[AUTH] Failed to parse ADMIN_USERS env:", err);
    }
  }

  return usersList;
}

export async function loginAdminAction(prevState: { error?: string } | undefined, formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  try {
    const adminUsers = getEnvAdminUsers();

    if (adminUsers.length === 0) {
      console.error(
        "[AUTH ERROR] Tidak ada kredensial admin yang disetel di environment variables (ADMIN_EMAIL & ADMIN_PASSWORD)."
      );
      return {
        error: "Konfigurasi autentikasi admin belum disetel di server (ADMIN_EMAIL & ADMIN_PASSWORD).",
      };
    }

    // Cari user berdasarkan email
    const matchedUser = adminUsers.find((u) => u.email === email);
    if (!matchedUser) {
      return {
        error: "Akun tidak ditemukan. Pastikan email yang dimasukkan benar.",
      };
    }

    // Verifikasi password (mendukung plaintext maupun bcrypt hash)
    const isMatch = await verifyPassword(password, matchedUser.password);
    if (!isMatch) {
      return { error: "Password yang Anda masukkan salah. Silakan coba lagi." };
    }

    // Set encrypted HMAC session cookie
    await setAdminSession({
      email: matchedUser.email,
      name: matchedUser.name || "Administrator BDA Group",
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

