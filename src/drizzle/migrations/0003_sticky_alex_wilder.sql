ALTER TABLE "address" ADD COLUMN "city" varchar;--> statement-breakpoint
ALTER TABLE "address" ADD COLUMN "users" varchar;--> statement-breakpoint
ALTER TABLE "address" ADD COLUMN "orders" integer;--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN "menu_item" varchar;--> statement-breakpoint
ALTER TABLE "city" ADD COLUMN "address" integer;--> statement-breakpoint
ALTER TABLE "city" ADD COLUMN "state" varchar;--> statement-breakpoint
ALTER TABLE "city" ADD COLUMN "restaurant" varchar;--> statement-breakpoint
ALTER TABLE "comment" ADD COLUMN "orders" integer;--> statement-breakpoint
ALTER TABLE "comment" ADD COLUMN "users" varchar;--> statement-breakpoint
ALTER TABLE "driver" ADD COLUMN "users" varchar;--> statement-breakpoint
ALTER TABLE "driver" ADD COLUMN "orders" varchar;--> statement-breakpoint
ALTER TABLE "menu_item" ADD COLUMN "category" varchar;--> statement-breakpoint
ALTER TABLE "menu_item" ADD COLUMN "restaurant" varchar;--> statement-breakpoint
ALTER TABLE "menu_item" ADD COLUMN "order_menu_item" varchar;--> statement-breakpoint
ALTER TABLE "order_menu_item" ADD COLUMN "menu_item" varchar;--> statement-breakpoint
ALTER TABLE "order_menu_item" ADD COLUMN "orders" integer;--> statement-breakpoint
ALTER TABLE "order_status" ADD COLUMN "orders" integer;--> statement-breakpoint
ALTER TABLE "order_status" ADD COLUMN "status_catalog" integer;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "comments" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "order_menu_item" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "order_status" boolean;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "address" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "driver" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "restaurant" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "users" varchar;--> statement-breakpoint
ALTER TABLE "restaurant_owner" ADD COLUMN "users" varchar;--> statement-breakpoint
ALTER TABLE "restaurant_owner" ADD COLUMN "restaurant" varchar;--> statement-breakpoint
ALTER TABLE "restaurant" ADD COLUMN "menu_item" varchar;--> statement-breakpoint
ALTER TABLE "restaurant" ADD COLUMN "orders" integer;--> statement-breakpoint
ALTER TABLE "restaurant" ADD COLUMN "city" varchar;--> statement-breakpoint
ALTER TABLE "restaurant" ADD COLUMN "restaurant_owner" varchar;--> statement-breakpoint
ALTER TABLE "state" ADD COLUMN "city" varchar;--> statement-breakpoint
ALTER TABLE "status_catalog" ADD COLUMN "order_status" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "comment_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "driver_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "restaurant_owner_id" integer;