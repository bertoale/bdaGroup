import { cookies } from "next/headers";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const ADMIN_COOKIE_NAME = "bda_group_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

export interface AdminSession {
  email: string;
  name: string;
  role: string;
  loggedInAt: number;
  expiresAt: number;
}

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is missing! Please configure it in .env.");
  }
  return secret;
}

/**
 * Hash password using Bcrypt (Salt rounds: 10)
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Verify plaintext password with bcrypt hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$") || hash.startsWith("$2y$")) {
    return bcrypt.compare(password, hash);
  }
  const bufA = Buffer.from(password);
  const bufB = Buffer.from(hash);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * HMAC-SHA256 signature
 */
function createSignature(payload: string): string {
  const secret = getAuthSecret();
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function verifySignature(payload: string, signature: string): boolean {
  const expectedSig = createSignature(payload);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length) return false;
  return crypto.timingSafeEqual(sigBuf, expBuf);
}

/**
 * Read and validate admin session from signed HTTP-Only cookie
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!sessionToken) return null;

  try {
    const parts = sessionToken.split(".");
    if (parts.length !== 2) return null;

    const [encodedPayload, signature] = parts;

    if (!verifySignature(encodedPayload, signature)) {
      console.warn("[AUTH] Tampered cookie detected!");
      return null;
    }

    const payloadJson = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const session: AdminSession = JSON.parse(payloadJson);

    if (!session.expiresAt || Date.now() > session.expiresAt) {
      return null;
    }

    if (session.role !== "admin" || !session.email) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Create and set signed HTTP-Only session cookie
 */
export async function setAdminSession(sessionData: Omit<AdminSession, "expiresAt">): Promise<void> {
  const cookieStore = await cookies();
  const now = Date.now();
  const expiresAt = now + SESSION_MAX_AGE * 1000;

  const session: AdminSession = {
    ...sessionData,
    expiresAt,
  };

  const payloadString = JSON.stringify(session);
  const encodedPayload = Buffer.from(payloadString).toString("base64url");
  const signature = createSignature(encodedPayload);
  const signedToken = `${encodedPayload}.${signature}`;

  cookieStore.set(ADMIN_COOKIE_NAME, signedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/**
 * Clear admin session on logout
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
