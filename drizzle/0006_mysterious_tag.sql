CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_document_id" uuid NOT NULL,
	"file_path" text NOT NULL,
	"file_name" text NOT NULL,
	"file_size" bigint,
	"content_type" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_request_document_id_request_documents_id_fk" FOREIGN KEY ("request_document_id") REFERENCES "public"."request_documents"("id") ON DELETE cascade ON UPDATE no action;