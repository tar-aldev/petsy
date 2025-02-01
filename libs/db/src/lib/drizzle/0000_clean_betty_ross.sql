CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text,
	"image" text,
	"auth_user_id" text NOT NULL,
	"country" text,
	"city" text,
	"preferred_language" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
