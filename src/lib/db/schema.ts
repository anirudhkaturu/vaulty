import { pgTable, text, timestamp, uuid, boolean, pgEnum, bigint } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const requestStatusEnum = pgEnum("request_status", ["pending", "in_progress", "completed", "expired"]);

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().notNull(), // This will link to Supabase Auth ID
  name: text("name"),
  companyName: text("company_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const profilesRelations = relations(profiles, ({ many }) => ({
  clients: many(clients),
  templates: many(request_templates),
}));

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

export const clientsRelations = relations(clients, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [clients.profileId],
    references: [profiles.id],
  }),
  requests: many(requests),
}));

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

export const requestTemplatesRelations = relations(request_templates, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [request_templates.profileId],
    references: [profiles.id],
  }),
  items: many(template_items),
  requests: many(requests),
}));

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

export const templateItemsRelations = relations(template_items, ({ one }) => ({
  template: one(request_templates, {
    fields: [template_items.templateId],
    references: [request_templates.id],
  }),
}));

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

export const requestsRelations = relations(requests, ({ one, many }) => ({
  client: one(clients, {
    fields: [requests.clientId],
    references: [clients.id],
  }),
  template: one(request_templates, {
    fields: [requests.templateId],
    references: [request_templates.id],
  }),
  documents: many(request_documents),
}));

export const request_documents = pgTable("request_documents", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  requestId: uuid("request_id")
    .references(() => requests.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  required: boolean("required").default(true),
  uploaded: boolean("uploaded").default(false),
  reviewStatus: text("review_status").default("pending"),
  rejectionReason: text("rejection_reason"),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const requestDocumentsRelations = relations(request_documents, ({ one }) => ({
  request: one(requests, {
    fields: [request_documents.requestId],
    references: [requests.id],
  }),
  file: one(documents),
}));

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

export const documentsRelations = relations(documents, ({ one }) => ({
  requestDocument: one(request_documents, {
    fields: [documents.requestDocumentId],
    references: [request_documents.id],
  }),
}));
