import {
  mysqlTable,
  bigint,
  varchar,
  text,
  mysqlEnum,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// ==========================================
// 1. GRP_JOB_POSITIONS TABLE (Daftar Lowongan Pekerjaan)
// ==========================================
export const grpJobPositions = mysqlTable("grp_job_positions", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: mysqlEnum("status", ["active", "closed"]).default("active").notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type GrpJobPosition = typeof grpJobPositions.$inferSelect;
export type NewGrpJobPosition = typeof grpJobPositions.$inferInsert;

// ==========================================
// 2. GRP_JOB_APPLICATIONS TABLE (Daftar Lamaran CV Pelamar)
// ==========================================
export const grpJobApplications = mysqlTable("grp_job_applications", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  jobPositionId: bigint("job_position_id", { mode: "number", unsigned: true }),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  cvPath: varchar("cv_path", { length: 500 }),
  status: mysqlEnum("status", ["new", "reviewed", "accepted", "rejected"]).default("new").notNull(),
  adminNotes: text("admin_notes"),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type GrpJobApplication = typeof grpJobApplications.$inferSelect;
export type NewGrpJobApplication = typeof grpJobApplications.$inferInsert;

// ==========================================
// RELATIONS
// ==========================================
export const grpJobPositionsRelations = relations(grpJobPositions, ({ many }) => ({
  applications: many(grpJobApplications),
}));

export const grpJobApplicationsRelations = relations(grpJobApplications, ({ one }) => ({
  jobPosition: one(grpJobPositions, {
    fields: [grpJobApplications.jobPositionId],
    references: [grpJobPositions.id],
  }),
}));

// ==========================================
// 3. USERS TABLE (Akun Admin Login)
// ==========================================
export const users = mysqlTable("users", {
  id: varchar("id", { length: 128 }).primaryKey(),
  name: varchar("name", { length: 255 }).default("Admin").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// ==========================================
// 4. LEADS TABLE (Contact Us Inquiries)
// ==========================================
export const leads = mysqlTable("leads", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email_address", { length: 255 }).notNull(),
  phone: varchar("phone_number", { length: 50 }),
  topic: varchar("topic", { length: 255 }).default("General Inquiry"),
  message: text("message").notNull(),
  source: varchar("source", { length: 100 }).default("contact_form"),
  status: mysqlEnum("status", ["new", "contacted", "closed"]).default("new").notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;


