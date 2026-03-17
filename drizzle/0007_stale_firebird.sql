ALTER TABLE "request_documents" ADD COLUMN "review_status" text DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "request_documents" ADD COLUMN "rejection_reason" text;--> statement-breakpoint
ALTER TABLE "request_documents" ADD COLUMN "reviewed_at" timestamp with time zone;