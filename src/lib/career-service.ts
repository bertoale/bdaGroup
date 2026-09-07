import { db } from "@/db";
import { grpJobPositions, grpJobApplications, GrpJobPosition, GrpJobApplication } from "@/db/schema";
import { eq, and, desc, like, or, sql } from "drizzle-orm";

// ==========================================
// PUBLIC METHODS
// ==========================================

/**
 * Mengambil daftar lowongan aktif untuk ditampilkan di halaman publik /career
 */
export async function getActiveJobPositions(): Promise<GrpJobPosition[]> {
  try {
    return await db
      .select()
      .from(grpJobPositions)
      .where(
        and(
          eq(grpJobPositions.isDeleted, false),
          eq(grpJobPositions.status, "active")
        )
      )
      .orderBy(desc(grpJobPositions.createdAt));
  } catch (error) {
    console.error("[CAREER SERVICE] Error fetching active positions:", error);
    return [];
  }
}

/**
 * Menyimpan lamaran kerja baru dari pelamar publik
 */
export async function createJobApplication(data: {
  name: string;
  email: string;
  phone: string;
  jobPositionId?: number | null;
  jobTitle: string;
  cvPath?: string | null;
}): Promise<GrpJobApplication> {
  const result = await db.insert(grpJobApplications).values({
    name: data.name,
    email: data.email,
    phone: data.phone,
    jobPositionId: data.jobPositionId ?? null,
    jobTitle: data.jobTitle,
    cvPath: data.cvPath ?? null,
    status: "new",
    isDeleted: false,
  });

  const insertId = Number(result[0].insertId);
  const created = await db
    .select()
    .from(grpJobApplications)
    .where(eq(grpJobApplications.id, insertId))
    .limit(1);

  return created[0];
}

// ==========================================
// ADMIN METHODS: JOB POSITIONS
// ==========================================

export async function getAllJobPositionsAdmin(): Promise<GrpJobPosition[]> {
  return await db
    .select()
    .from(grpJobPositions)
    .where(eq(grpJobPositions.isDeleted, false))
    .orderBy(desc(grpJobPositions.createdAt));
}

export async function saveJobPosition(data: {
  id?: number | null;
  title: string;
  description: string;
  status: "active" | "closed";
}) {
  if (data.id) {
    await db
      .update(grpJobPositions)
      .set({
        title: data.title,
        description: data.description,
        status: data.status,
      })
      .where(eq(grpJobPositions.id, data.id));
    return { id: data.id, action: "updated" };
  } else {
    const res = await db.insert(grpJobPositions).values({
      title: data.title,
      description: data.description,
      status: data.status,
      isDeleted: false,
    });
    return { id: Number(res[0].insertId), action: "created" };
  }
}

export async function toggleJobPositionStatus(id: number) {
  const found = await db
    .select()
    .from(grpJobPositions)
    .where(eq(grpJobPositions.id, id))
    .limit(1);

  if (!found.length) throw new Error("Job position not found");

  const newStatus = found[0].status === "active" ? "closed" : "active";
  await db
    .update(grpJobPositions)
    .set({ status: newStatus })
    .where(eq(grpJobPositions.id, id));

  return { id, status: newStatus };
}

export async function softDeleteJobPosition(id: number) {
  await db
    .update(grpJobPositions)
    .set({ isDeleted: true })
    .where(eq(grpJobPositions.id, id));
  return { id, deleted: true };
}

// ==========================================
// ADMIN METHODS: APPLICATIONS & STATS
// ==========================================

export interface ApplicationFilterParams {
  searchQuery?: string;
  statusFilter?: string;
  positionFilter?: string;
}

export async function getJobApplicationsAdmin(filters: ApplicationFilterParams = {}) {
  const conditions = [eq(grpJobApplications.isDeleted, false)];

  if (filters.statusFilter && ["new", "reviewed", "accepted", "rejected"].includes(filters.statusFilter)) {
    conditions.push(
      eq(
        grpJobApplications.status,
        filters.statusFilter as "new" | "reviewed" | "accepted" | "rejected"
      )
    );
  }

  if (filters.positionFilter) {
    conditions.push(like(grpJobApplications.jobTitle, `%${filters.positionFilter}%`));
  }

  if (filters.searchQuery) {
    const q = `%${filters.searchQuery}%`;
    conditions.push(
      or(
        like(grpJobApplications.name, q),
        like(grpJobApplications.email, q),
        like(grpJobApplications.phone, q),
        like(grpJobApplications.jobTitle, q)
      )!
    );
  }

  const applications = await db
    .select()
    .from(grpJobApplications)
    .where(and(...conditions))
    .orderBy(desc(grpJobApplications.createdAt));

  return applications;
}

export async function getCareerStatsAdmin() {
  const appRows = await db
    .select({
      total: sql<number>`count(*)`,
      newCount: sql<number>`sum(case when status = 'new' then 1 else 0 end)`,
      reviewedCount: sql<number>`sum(case when status = 'reviewed' then 1 else 0 end)`,
      acceptedCount: sql<number>`sum(case when status = 'accepted' then 1 else 0 end)`,
      rejectedCount: sql<number>`sum(case when status = 'rejected' then 1 else 0 end)`,
    })
    .from(grpJobApplications)
    .where(eq(grpJobApplications.isDeleted, false));

  const posRows = await db
    .select({
      total: sql<number>`count(*)`,
      activeCount: sql<number>`sum(case when status = 'active' then 1 else 0 end)`,
      closedCount: sql<number>`sum(case when status = 'closed' then 1 else 0 end)`,
    })
    .from(grpJobPositions)
    .where(eq(grpJobPositions.isDeleted, false));

  return {
    apps: {
      total: Number(appRows[0]?.total ?? 0),
      new: Number(appRows[0]?.newCount ?? 0),
      reviewed: Number(appRows[0]?.reviewedCount ?? 0),
      accepted: Number(appRows[0]?.acceptedCount ?? 0),
      rejected: Number(appRows[0]?.rejectedCount ?? 0),
    },
    positions: {
      total: Number(posRows[0]?.total ?? 0),
      active: Number(posRows[0]?.activeCount ?? 0),
      closed: Number(posRows[0]?.closedCount ?? 0),
    },
  };
}

export async function updateApplicationStatusAndNotes(
  id: number,
  status: "new" | "reviewed" | "accepted" | "rejected",
  adminNotes?: string
) {
  await db
    .update(grpJobApplications)
    .set({
      status,
      adminNotes: adminNotes ?? null,
    })
    .where(eq(grpJobApplications.id, id));

  return { id, status };
}

export async function softDeleteApplication(id: number) {
  await db
    .update(grpJobApplications)
    .set({ isDeleted: true })
    .where(eq(grpJobApplications.id, id));
  return { id, deleted: true };
}
