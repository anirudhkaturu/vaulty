ALTER TABLE "profiles" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "welcome_message" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "default_expiry_days" bigint DEFAULT 14 NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "notify_on_upload" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "notify_on_completion" boolean DEFAULT true NOT NULL;