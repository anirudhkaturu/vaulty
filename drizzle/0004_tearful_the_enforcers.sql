CREATE TYPE "public"."request_status" AS ENUM('pending', 'in_progress', 'completed', 'expired');--> statement-breakpoint
CREATE TABLE "requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"template_id" uuid,
	"upload_token" text NOT NULL,
	"status" text DEFAULT 'pending',
	"due_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	CONSTRAINT "requests_upload_token_unique" UNIQUE("upload_token")
);
--> statement-breakpoint
ALTER TABLE "requests" ADD CONSTRAINT "requests_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "requests" ADD CONSTRAINT "requests_template_id_request_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."request_templates"("id") ON DELETE set null ON UPDATE no action;