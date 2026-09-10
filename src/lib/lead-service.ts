import { db } from "@/db";
import { leads, Lead, NewLead } from "@/db/schema";
import { eq, desc, and, like, or, sql } from "drizzle-orm";

export async function createLead(data: {
  fullName: string;
  email: string;
  phone?: string | null;
  topic?: string | null;
  message: string;
  source?: string;
}): Promise<{ success: boolean; leadId?: number; error?: string }> {
  try {
    const result = await db.insert(leads).values({
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || null,
      topic: data.topic?.trim() || "General Inquiry",
      message: data.message.trim(),
      source: data.source || "contact_form",
      status: "new",
      isDeleted: false,
    });

    const insertId = Number(result[0].insertId);

    // Asynchronous dispatch to LeadStreams CRM (mirrored from apps/estate LeadStreamsService)
    // Best-effort: won't block or fail the client response if external CRM is unreachable
    try {
      const { sendLeadToLeadStreams } = await import("./leadstreams");
      sendLeadToLeadStreams({
        externalId: `bdagrp-lead-${insertId}`,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        topic: data.topic,
        message: data.message,
        source: data.source || "bestdealsasiagroup.com",
      }).catch((streamErr) => {
        console.warn("[LEADSTREAMS] Background sync error:", streamErr);
      });
    } catch (e) {
      console.warn("[LEADSTREAMS] Failed to initialize LeadStreams dispatch:", e);
    }

    return { success: true, leadId: insertId };
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("[LEAD SERVICE] Failed to save lead:", err.message || error);
    return { success: false, error: err.message || "Failed to save inquiry." };
  }
}

export async function getLeadsAdmin(filters?: {
  search?: string;
  status?: string;
  topic?: string;
}): Promise<{
  leads: Lead[];
  stats: { total: number; new: number; contacted: number; closed: number };
}> {
  try {
    const conditions = [eq(leads.isDeleted, false)];

    if (filters?.status) {
      conditions.push(eq(leads.status, filters.status as "new" | "contacted" | "closed"));
    }

    if (filters?.topic) {
      conditions.push(eq(leads.topic, filters.topic));
    }

    if (filters?.search) {
      const q = `%${filters.search.trim()}%`;
      conditions.push(
        or(
          like(leads.fullName, q),
          like(leads.email, q),
          like(leads.phone, q),
          like(leads.message, q)
        )!
      );
    }

    const leadList = await db
      .select()
      .from(leads)
      .where(and(...conditions))
      .orderBy(desc(leads.createdAt));

    // Stats
    const statsResult = await db
      .select({
        status: leads.status,
        count: sql<number>`count(*)`,
      })
      .from(leads)
      .where(eq(leads.isDeleted, false))
      .groupBy(leads.status);

    const stats = {
      total: 0,
      new: 0,
      contacted: 0,
      closed: 0,
    };

    statsResult.forEach((row) => {
      const count = Number(row.count);
      stats.total += count;
      if (row.status === "new") stats.new = count;
      if (row.status === "contacted") stats.contacted = count;
      if (row.status === "closed") stats.closed = count;
    });

    return { leads: leadList, stats };
  } catch (error) {
    console.error("[LEAD SERVICE] Failed to fetch leads:", error);
    return {
      leads: [],
      stats: { total: 0, new: 0, contacted: 0, closed: 0 },
    };
  }
}

export async function updateLeadStatus(
  id: number,
  status: "new" | "contacted" | "closed"
): Promise<boolean> {
  try {
    await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id));
    return true;
  } catch (error) {
    console.error("[LEAD SERVICE] Failed to update lead status:", error);
    return false;
  }
}

export async function deleteLead(id: number): Promise<boolean> {
  try {
    await db
      .update(leads)
      .set({ isDeleted: true })
      .where(eq(leads.id, id));
    return true;
  } catch (error) {
    console.error("[LEAD SERVICE] Failed to delete lead:", error);
    return false;
  }
}
