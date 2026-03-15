import { pgTable, text, timestamp, uuid, boolean, pgEnum, bigint } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const requestStatusEnum = pgEnum("request_status", ["pending", "in_progress", "completed", "expired"]);

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().notNull(), // This will link to Supabase Auth ID
  name: text("name"),
  companyName: text("company_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: uuid("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const request_templates = pgTable("request_templates", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  profileId: uuid("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const template_items = pgTable("template_items", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  templateId: uuid("template_id")
    .references(() => request_templates.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  isRequired: boolean("is_required").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const requests = pgTable("requests", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: uuid("client_id")
    .references(() => clients.id, { onDelete: "cascade" })
    .notNull(),
  templateId: uuid("template_id").references(() => request_templates.id, {
    onDelete: "set null",
  }),
  uploadToken: text("upload_token").unique().notNull(),
  status: text("status").default("pending"),
  dueDate: timestamp("due_date", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const request_documents = pgTable("request_documents", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  requestId: uuid("request_id")
    .references(() => requests.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  required: boolean("required").default(true),
  uploaded: boolean("uploaded").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  requestDocumentId: uuid("request_document_id")
    .references(() => request_documents.id, { onDelete: "cascade" })
    .notNull(),
  filePath: text("file_path").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: bigint("file_size", { mode: "number" }),
  contentType: text("content_type"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
