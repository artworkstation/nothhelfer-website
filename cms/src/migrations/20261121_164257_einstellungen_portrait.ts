import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "einstellungen" ADD COLUMN "portrait_id" integer;
  ALTER TABLE "einstellungen" ADD CONSTRAINT "einstellungen_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "einstellungen_portrait_idx" ON "einstellungen" USING btree ("portrait_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "einstellungen" DROP CONSTRAINT "einstellungen_portrait_id_media_id_fk";
  
  DROP INDEX "einstellungen_portrait_idx";
  ALTER TABLE "einstellungen" DROP COLUMN "portrait_id";`)
}
