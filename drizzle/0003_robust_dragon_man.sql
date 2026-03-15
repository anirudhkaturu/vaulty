CREATE TABLE "template_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_required" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "template_items" ADD CONSTRAINT "template_items_template_id_request_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."request_templates"("id") ON DELETE cascade ON UPDATE no action;