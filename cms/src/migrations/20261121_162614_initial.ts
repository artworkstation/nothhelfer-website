import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_karten_karten_icon" AS ENUM('plus', 'pfeil');
  CREATE TYPE "public"."enum_pages_blocks_karten_hintergrund" AS ENUM('weiss', 'hell');
  CREATE TYPE "public"."enum_pages_blocks_angebote_vermarktung" AS ENUM('alle', 'Kauf', 'Miete');
  CREATE TYPE "public"."enum_pages_blocks_liste_hintergrund" AS ENUM('weiss', 'hell', 'dunkel');
  CREATE TYPE "public"."enum_pages_blocks_kontakt_formular" AS ENUM('kontakt', 'gutachten', 'suchauftrag');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_karten_karten_icon" AS ENUM('plus', 'pfeil');
  CREATE TYPE "public"."enum__pages_v_blocks_karten_hintergrund" AS ENUM('weiss', 'hell');
  CREATE TYPE "public"."enum__pages_v_blocks_angebote_vermarktung" AS ENUM('alle', 'Kauf', 'Miete');
  CREATE TYPE "public"."enum__pages_v_blocks_liste_hintergrund" AS ENUM('weiss', 'hell', 'dunkel');
  CREATE TYPE "public"."enum__pages_v_blocks_kontakt_formular" AS ENUM('kontakt', 'gutachten', 'suchauftrag');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_objekte_vermarktung" AS ENUM('Kauf', 'Miete');
  CREATE TYPE "public"."enum_objekte_objektart" AS ENUM('Haus', 'Wohnung', 'Grundstück', 'Gewerbe', 'Kapitalanlage');
  CREATE TYPE "public"."enum_objekte_objektstatus" AS ENUM('aktiv', 'reserviert', 'verkauft');
  CREATE TYPE "public"."enum_objekte_energie_art" AS ENUM('Bedarfsausweis', 'Verbrauchsausweis', 'liegt nicht vor');
  CREATE TYPE "public"."enum_objekte_energie_klasse" AS ENUM('A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H');
  CREATE TYPE "public"."enum_objekte_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__objekte_v_version_vermarktung" AS ENUM('Kauf', 'Miete');
  CREATE TYPE "public"."enum__objekte_v_version_objektart" AS ENUM('Haus', 'Wohnung', 'Grundstück', 'Gewerbe', 'Kapitalanlage');
  CREATE TYPE "public"."enum__objekte_v_version_objektstatus" AS ENUM('aktiv', 'reserviert', 'verkauft');
  CREATE TYPE "public"."enum__objekte_v_version_energie_art" AS ENUM('Bedarfsausweis', 'Verbrauchsausweis', 'liegt nicht vor');
  CREATE TYPE "public"."enum__objekte_v_version_energie_klasse" AS ENUM('A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H');
  CREATE TYPE "public"."enum__objekte_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_ratgeber_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ratgeber_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_gemeinden_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__gemeinden_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_anfragen_typ" AS ENUM('kontakt', 'objekt', 'gutachten', 'suchauftrag', 'wertermittlung');
  CREATE TYPE "public"."enum_users_rolle" AS ENUM('admin', 'redakteur');
  CREATE TABLE "pages_blocks_hero_szene_kacheln" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"bild_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_szene" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subline" varchar,
  	"subline_akzent" varchar,
  	"bild_id" integer,
  	"claim" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_seitenkopf_kacheln" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"bild_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_seitenkopf" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bild_id" integer,
  	"kurz" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"lead" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_warum" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'warum NOTHHELFER',
  	"text" varchar,
  	"text_akzent" varchar,
  	"bild_id" integer,
  	"video_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pfeile" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"bild_links_id" integer,
  	"bild_rechts_id" integer,
  	"text" varchar,
  	"text_akzent" varchar,
  	"button_text" varchar,
  	"button_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stufen_schritte" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_stufen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'drei Stufen-Methodik',
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"button_text" varchar,
  	"button_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_karten_karten" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bild_id" integer,
  	"tag" varchar,
  	"neu" boolean,
  	"titel" varchar,
  	"text" varchar,
  	"link" varchar,
  	"button_text" varchar DEFAULT 'Mehr erfahren',
  	"icon" "enum_pages_blocks_karten_karten_icon" DEFAULT 'plus'
  );
  
  CREATE TABLE "pages_blocks_karten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"text" varchar,
  	"hintergrund" "enum_pages_blocks_karten_hintergrund" DEFAULT 'weiss',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_kundenstimmen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'Überzeug dich selbst.',
  	"label" varchar DEFAULT 'Kundenstimmen',
  	"bild_id" integer,
  	"anzahl" numeric DEFAULT 5,
  	"hinweis" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_zeilen" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"wort" varchar,
  	"text" varchar,
  	"bild_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'unser Service',
  	"outro" varchar,
  	"button_text" varchar DEFAULT 'Jetzt anrufen',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_angebote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"text" varchar,
  	"vermarktung" "enum_pages_blocks_angebote_vermarktung" DEFAULT 'alle',
  	"anzahl" numeric DEFAULT 3,
  	"mit_filter" boolean,
  	"hintergrund" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_kompetenz_fakten" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"zahl" varchar,
  	"einheit" varchar,
  	"zaehlen" boolean DEFAULT true,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_kompetenz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Expertise',
  	"headline" varchar,
  	"portrait_id" integer,
  	"bild_id" integer,
  	"text" jsonb,
  	"button_text" varchar,
  	"button_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ansprechpartner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"portrait_id" integer,
  	"bild_id" integer,
  	"text" jsonb,
  	"button_text" varchar,
  	"button_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ratgeber_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'Ratgeber',
  	"anzahl" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"text" varchar,
  	"bild_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Lass uns sprechen.',
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_prozess_schritte" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_prozess" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Der Prozess',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_liste_punkte" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_liste" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"hinweis" varchar,
  	"hintergrund" "enum_pages_blocks_liste_hintergrund" DEFAULT 'weiss',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"inhalt" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_region" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Unser Gebiet',
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"text" varchar,
  	"referenzen" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_kontakt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Kontakt',
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"formular" "enum_pages_blocks_kontakt_formular" DEFAULT 'kontakt',
  	"mit_kontaktdaten" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_fragen" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"frage" varchar,
  	"antwort" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Häufige Fragen',
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_mitglieder" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"funktion" varchar,
  	"bild_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Team',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_zeitstrahl_eintraege" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"jahr" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_zeitstrahl" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Stationen',
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_referenzen_eintraege" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"ort" varchar,
  	"jahr" varchar
  );
  
  CREATE TABLE "pages_blocks_referenzen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Referenzen',
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_siegel_punkte" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_siegel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Auszeichnungen & Mitgliedschaften',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_wertermittlung" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hinweis" varchar DEFAULT 'Erste Orientierung auf Basis von Durchschnittswerten. Für eine verlässliche Bewertung meldet sich Erik Nothhelfer persönlich.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"pfad" varchar,
  	"seo_meta_titel" varchar,
  	"seo_meta_beschreibung" varchar,
  	"seo_og_bild_id" integer,
  	"seo_noindex" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"gemeinden_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_szene_kacheln" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"bild_id" integer,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_szene" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subline" varchar,
  	"subline_akzent" varchar,
  	"bild_id" integer,
  	"claim" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_seitenkopf_kacheln" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"bild_id" integer,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_seitenkopf" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bild_id" integer,
  	"kurz" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"lead" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_warum" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'warum NOTHHELFER',
  	"text" varchar,
  	"text_akzent" varchar,
  	"bild_id" integer,
  	"video_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pfeile" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"bild_links_id" integer,
  	"bild_rechts_id" integer,
  	"text" varchar,
  	"text_akzent" varchar,
  	"button_text" varchar,
  	"button_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stufen_schritte" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stufen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'drei Stufen-Methodik',
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"button_text" varchar,
  	"button_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_karten_karten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bild_id" integer,
  	"tag" varchar,
  	"neu" boolean,
  	"titel" varchar,
  	"text" varchar,
  	"link" varchar,
  	"button_text" varchar DEFAULT 'Mehr erfahren',
  	"icon" "enum__pages_v_blocks_karten_karten_icon" DEFAULT 'plus',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_karten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"text" varchar,
  	"hintergrund" "enum__pages_v_blocks_karten_hintergrund" DEFAULT 'weiss',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_kundenstimmen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'Überzeug dich selbst.',
  	"label" varchar DEFAULT 'Kundenstimmen',
  	"bild_id" integer,
  	"anzahl" numeric DEFAULT 5,
  	"hinweis" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_zeilen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"wort" varchar,
  	"text" varchar,
  	"bild_id" integer,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'unser Service',
  	"outro" varchar,
  	"button_text" varchar DEFAULT 'Jetzt anrufen',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_angebote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"text" varchar,
  	"vermarktung" "enum__pages_v_blocks_angebote_vermarktung" DEFAULT 'alle',
  	"anzahl" numeric DEFAULT 3,
  	"mit_filter" boolean,
  	"hintergrund" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_kompetenz_fakten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"zahl" varchar,
  	"einheit" varchar,
  	"zaehlen" boolean DEFAULT true,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_kompetenz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Expertise',
  	"headline" varchar,
  	"portrait_id" integer,
  	"bild_id" integer,
  	"text" jsonb,
  	"button_text" varchar,
  	"button_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ansprechpartner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"portrait_id" integer,
  	"bild_id" integer,
  	"text" jsonb,
  	"button_text" varchar,
  	"button_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ratgeber_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'Ratgeber',
  	"anzahl" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"text" varchar,
  	"bild_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar DEFAULT 'Lass uns sprechen.',
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_prozess_schritte" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_prozess" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Der Prozess',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_liste_punkte" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_liste" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"hinweis" varchar,
  	"hintergrund" "enum__pages_v_blocks_liste_hintergrund" DEFAULT 'weiss',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"inhalt" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_region" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Unser Gebiet',
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"text" varchar,
  	"referenzen" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_kontakt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Kontakt',
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"formular" "enum__pages_v_blocks_kontakt_formular" DEFAULT 'kontakt',
  	"mit_kontaktdaten" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_fragen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"frage" varchar,
  	"antwort" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Häufige Fragen',
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_mitglieder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"funktion" varchar,
  	"bild_id" integer,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Team',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_zeitstrahl_eintraege" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"jahr" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_zeitstrahl" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Stationen',
  	"zeile1" varchar,
  	"zeile2" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_referenzen_eintraege" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"ort" varchar,
  	"jahr" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_referenzen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Referenzen',
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_siegel_punkte" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_siegel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Auszeichnungen & Mitgliedschaften',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_wertermittlung" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hinweis" varchar DEFAULT 'Erste Orientierung auf Basis von Durchschnittswerten. Für eine verlässliche Bewertung meldet sich Erik Nothhelfer persönlich.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titel" varchar,
  	"version_pfad" varchar,
  	"version_seo_meta_titel" varchar,
  	"version_seo_meta_beschreibung" varchar,
  	"version_seo_og_bild_id" integer,
  	"version_seo_noindex" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"gemeinden_id" integer
  );
  
  CREATE TABLE "objekte_daten_weitere" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bezeichnung" varchar,
  	"wert" varchar
  );
  
  CREATE TABLE "objekte" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"teaser" varchar,
  	"slug" varchar,
  	"vermarktung" "enum_objekte_vermarktung" DEFAULT 'Kauf',
  	"objektart" "enum_objekte_objektart" DEFAULT 'Haus',
  	"objektstatus" "enum_objekte_objektstatus" DEFAULT 'aktiv',
  	"plz" varchar,
  	"ort" varchar,
  	"preis" varchar,
  	"kurztext" varchar,
  	"beschreibung" jsonb,
  	"daten_zimmer" varchar,
  	"daten_baeder" varchar,
  	"daten_baujahr" varchar,
  	"daten_wohnflaeche" numeric,
  	"daten_grundstueck" numeric,
  	"daten_heizung" varchar,
  	"daten_verfuegbar" varchar,
  	"energie_art" "enum_objekte_energie_art",
  	"energie_klasse" "enum_objekte_energie_klasse",
  	"energie_kennwert" numeric,
  	"lage_lat" numeric,
  	"lage_lng" numeric,
  	"eingestellt" timestamp(3) with time zone,
  	"externe_id" varchar,
  	"seo_meta_titel" varchar,
  	"seo_meta_beschreibung" varchar,
  	"seo_og_bild_id" integer,
  	"seo_noindex" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_objekte_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "objekte_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_objekte_v_version_daten_weitere" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bezeichnung" varchar,
  	"wert" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_objekte_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titel" varchar,
  	"version_teaser" varchar,
  	"version_slug" varchar,
  	"version_vermarktung" "enum__objekte_v_version_vermarktung" DEFAULT 'Kauf',
  	"version_objektart" "enum__objekte_v_version_objektart" DEFAULT 'Haus',
  	"version_objektstatus" "enum__objekte_v_version_objektstatus" DEFAULT 'aktiv',
  	"version_plz" varchar,
  	"version_ort" varchar,
  	"version_preis" varchar,
  	"version_kurztext" varchar,
  	"version_beschreibung" jsonb,
  	"version_daten_zimmer" varchar,
  	"version_daten_baeder" varchar,
  	"version_daten_baujahr" varchar,
  	"version_daten_wohnflaeche" numeric,
  	"version_daten_grundstueck" numeric,
  	"version_daten_heizung" varchar,
  	"version_daten_verfuegbar" varchar,
  	"version_energie_art" "enum__objekte_v_version_energie_art",
  	"version_energie_klasse" "enum__objekte_v_version_energie_klasse",
  	"version_energie_kennwert" numeric,
  	"version_lage_lat" numeric,
  	"version_lage_lng" numeric,
  	"version_eingestellt" timestamp(3) with time zone,
  	"version_externe_id" varchar,
  	"version_seo_meta_titel" varchar,
  	"version_seo_meta_beschreibung" varchar,
  	"version_seo_og_bild_id" integer,
  	"version_seo_noindex" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__objekte_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_objekte_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "ratgeber_kurzfassung" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"punkt" varchar
  );
  
  CREATE TABLE "ratgeber_fragen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"frage" varchar,
  	"antwort" varchar
  );
  
  CREATE TABLE "ratgeber" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titel" varchar,
  	"slug" varchar,
  	"kategorie" varchar DEFAULT 'Verkauf',
  	"datum" timestamp(3) with time zone,
  	"bild_id" integer,
  	"lead" varchar,
  	"inhalt" jsonb,
  	"seo_meta_titel" varchar,
  	"seo_meta_beschreibung" varchar,
  	"seo_og_bild_id" integer,
  	"seo_noindex" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_ratgeber_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_ratgeber_v_version_kurzfassung" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"punkt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ratgeber_v_version_fragen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"frage" varchar,
  	"antwort" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ratgeber_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titel" varchar,
  	"version_slug" varchar,
  	"version_kategorie" varchar DEFAULT 'Verkauf',
  	"version_datum" timestamp(3) with time zone,
  	"version_bild_id" integer,
  	"version_lead" varchar,
  	"version_inhalt" jsonb,
  	"version_seo_meta_titel" varchar,
  	"version_seo_meta_beschreibung" varchar,
  	"version_seo_og_bild_id" integer,
  	"version_seo_noindex" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__ratgeber_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "kundenstimmen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"zitat" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"ort" varchar,
  	"sterne" numeric DEFAULT 5,
  	"reihenfolge" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gemeinden_fragen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"frage" varchar,
  	"antwort" varchar
  );
  
  CREATE TABLE "gemeinden" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"landkreis" varchar,
  	"einleitung" varchar,
  	"text" jsonb,
  	"lat" numeric,
  	"lng" numeric,
  	"seo_meta_titel" varchar,
  	"seo_meta_beschreibung" varchar,
  	"seo_og_bild_id" integer,
  	"seo_noindex" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_gemeinden_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_gemeinden_v_version_fragen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"frage" varchar,
  	"antwort" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_gemeinden_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_landkreis" varchar,
  	"version_einleitung" varchar,
  	"version_text" jsonb,
  	"version_lat" numeric,
  	"version_lng" numeric,
  	"version_seo_meta_titel" varchar,
  	"version_seo_meta_beschreibung" varchar,
  	"version_seo_og_bild_id" integer,
  	"version_seo_noindex" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__gemeinden_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_klein_url" varchar,
  	"sizes_klein_width" numeric,
  	"sizes_klein_height" numeric,
  	"sizes_klein_mime_type" varchar,
  	"sizes_klein_filesize" numeric,
  	"sizes_klein_filename" varchar,
  	"sizes_mittel_url" varchar,
  	"sizes_mittel_width" numeric,
  	"sizes_mittel_height" numeric,
  	"sizes_mittel_mime_type" varchar,
  	"sizes_mittel_filesize" numeric,
  	"sizes_mittel_filename" varchar,
  	"sizes_gross_url" varchar,
  	"sizes_gross_width" numeric,
  	"sizes_gross_height" numeric,
  	"sizes_gross_mime_type" varchar,
  	"sizes_gross_filesize" numeric,
  	"sizes_gross_filename" varchar
  );
  
  CREATE TABLE "anfragen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"typ" "enum_anfragen_typ" DEFAULT 'kontakt' NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"telefon" varchar,
  	"objekt" varchar,
  	"nachricht" varchar,
  	"daten" jsonb,
  	"datenschutz" boolean DEFAULT false NOT NULL,
  	"website" varchar,
  	"erledigt" boolean,
  	"notiz" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"rolle" "enum_users_rolle" DEFAULT 'redakteur' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"objekte_id" integer,
  	"ratgeber_id" integer,
  	"kundenstimmen_id" integer,
  	"gemeinden_id" integer,
  	"media_id" integer,
  	"anfragen_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "einstellungen_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "einstellungen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"firma" varchar DEFAULT 'Immobilien Nothhelfer IVD',
  	"inhaber" varchar DEFAULT 'Erik Nothhelfer',
  	"strasse" varchar DEFAULT 'Fischergasse 21',
  	"plz" varchar DEFAULT '89073',
  	"ort" varchar DEFAULT 'Ulm',
  	"telefon" varchar DEFAULT '0731 61202',
  	"fax" varchar DEFAULT '0731 61220',
  	"email" varchar DEFAULT 'info@immobilien-nothhelfer.de',
  	"termine" varchar DEFAULT 'Im Büro, am Telefon oder per Video – nach Vereinbarung.',
  	"lat" numeric DEFAULT 48.3972,
  	"lng" numeric DEFAULT 9.9893,
  	"anfrage_empfaenger" varchar DEFAULT 'info@immobilien-nothhelfer.de',
  	"claim_footer" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_hauptmenue_unterpunkte" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "navigation_hauptmenue" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero_szene_kacheln" ADD CONSTRAINT "pages_blocks_hero_szene_kacheln_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_szene_kacheln" ADD CONSTRAINT "pages_blocks_hero_szene_kacheln_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_szene"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_szene" ADD CONSTRAINT "pages_blocks_hero_szene_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_szene" ADD CONSTRAINT "pages_blocks_hero_szene_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_seitenkopf_kacheln" ADD CONSTRAINT "pages_blocks_seitenkopf_kacheln_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_seitenkopf_kacheln" ADD CONSTRAINT "pages_blocks_seitenkopf_kacheln_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_seitenkopf"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_seitenkopf" ADD CONSTRAINT "pages_blocks_seitenkopf_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_seitenkopf" ADD CONSTRAINT "pages_blocks_seitenkopf_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro" ADD CONSTRAINT "pages_blocks_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_warum" ADD CONSTRAINT "pages_blocks_warum_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_warum" ADD CONSTRAINT "pages_blocks_warum_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_warum" ADD CONSTRAINT "pages_blocks_warum_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pfeile" ADD CONSTRAINT "pages_blocks_pfeile_bild_links_id_media_id_fk" FOREIGN KEY ("bild_links_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pfeile" ADD CONSTRAINT "pages_blocks_pfeile_bild_rechts_id_media_id_fk" FOREIGN KEY ("bild_rechts_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pfeile" ADD CONSTRAINT "pages_blocks_pfeile_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stufen_schritte" ADD CONSTRAINT "pages_blocks_stufen_schritte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stufen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stufen" ADD CONSTRAINT "pages_blocks_stufen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_karten_karten" ADD CONSTRAINT "pages_blocks_karten_karten_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_karten_karten" ADD CONSTRAINT "pages_blocks_karten_karten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_karten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_karten" ADD CONSTRAINT "pages_blocks_karten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_kundenstimmen" ADD CONSTRAINT "pages_blocks_kundenstimmen_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_kundenstimmen" ADD CONSTRAINT "pages_blocks_kundenstimmen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_zeilen" ADD CONSTRAINT "pages_blocks_service_zeilen_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_zeilen" ADD CONSTRAINT "pages_blocks_service_zeilen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service" ADD CONSTRAINT "pages_blocks_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_angebote" ADD CONSTRAINT "pages_blocks_angebote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_kompetenz_fakten" ADD CONSTRAINT "pages_blocks_kompetenz_fakten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_kompetenz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_kompetenz" ADD CONSTRAINT "pages_blocks_kompetenz_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_kompetenz" ADD CONSTRAINT "pages_blocks_kompetenz_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_kompetenz" ADD CONSTRAINT "pages_blocks_kompetenz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ansprechpartner" ADD CONSTRAINT "pages_blocks_ansprechpartner_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ansprechpartner" ADD CONSTRAINT "pages_blocks_ansprechpartner_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ansprechpartner" ADD CONSTRAINT "pages_blocks_ansprechpartner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ratgeber_teaser" ADD CONSTRAINT "pages_blocks_ratgeber_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_buttons" ADD CONSTRAINT "pages_blocks_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band" ADD CONSTRAINT "pages_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_prozess_schritte" ADD CONSTRAINT "pages_blocks_prozess_schritte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_prozess"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_prozess" ADD CONSTRAINT "pages_blocks_prozess_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_liste_punkte" ADD CONSTRAINT "pages_blocks_liste_punkte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_liste"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_liste" ADD CONSTRAINT "pages_blocks_liste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text" ADD CONSTRAINT "pages_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_region" ADD CONSTRAINT "pages_blocks_region_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_kontakt" ADD CONSTRAINT "pages_blocks_kontakt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_fragen" ADD CONSTRAINT "pages_blocks_faq_fragen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_mitglieder" ADD CONSTRAINT "pages_blocks_team_mitglieder_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_mitglieder" ADD CONSTRAINT "pages_blocks_team_mitglieder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_zeitstrahl_eintraege" ADD CONSTRAINT "pages_blocks_zeitstrahl_eintraege_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_zeitstrahl"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_zeitstrahl" ADD CONSTRAINT "pages_blocks_zeitstrahl_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_referenzen_eintraege" ADD CONSTRAINT "pages_blocks_referenzen_eintraege_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_referenzen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_referenzen" ADD CONSTRAINT "pages_blocks_referenzen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_siegel_punkte" ADD CONSTRAINT "pages_blocks_siegel_punkte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_siegel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_siegel" ADD CONSTRAINT "pages_blocks_siegel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_wertermittlung" ADD CONSTRAINT "pages_blocks_wertermittlung_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_bild_id_media_id_fk" FOREIGN KEY ("seo_og_bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_gemeinden_fk" FOREIGN KEY ("gemeinden_id") REFERENCES "public"."gemeinden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_szene_kacheln" ADD CONSTRAINT "_pages_v_blocks_hero_szene_kacheln_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_szene_kacheln" ADD CONSTRAINT "_pages_v_blocks_hero_szene_kacheln_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_szene"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_szene" ADD CONSTRAINT "_pages_v_blocks_hero_szene_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_szene" ADD CONSTRAINT "_pages_v_blocks_hero_szene_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_seitenkopf_kacheln" ADD CONSTRAINT "_pages_v_blocks_seitenkopf_kacheln_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_seitenkopf_kacheln" ADD CONSTRAINT "_pages_v_blocks_seitenkopf_kacheln_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_seitenkopf"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_seitenkopf" ADD CONSTRAINT "_pages_v_blocks_seitenkopf_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_seitenkopf" ADD CONSTRAINT "_pages_v_blocks_seitenkopf_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro" ADD CONSTRAINT "_pages_v_blocks_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_warum" ADD CONSTRAINT "_pages_v_blocks_warum_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_warum" ADD CONSTRAINT "_pages_v_blocks_warum_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_warum" ADD CONSTRAINT "_pages_v_blocks_warum_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pfeile" ADD CONSTRAINT "_pages_v_blocks_pfeile_bild_links_id_media_id_fk" FOREIGN KEY ("bild_links_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pfeile" ADD CONSTRAINT "_pages_v_blocks_pfeile_bild_rechts_id_media_id_fk" FOREIGN KEY ("bild_rechts_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pfeile" ADD CONSTRAINT "_pages_v_blocks_pfeile_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stufen_schritte" ADD CONSTRAINT "_pages_v_blocks_stufen_schritte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stufen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stufen" ADD CONSTRAINT "_pages_v_blocks_stufen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_karten_karten" ADD CONSTRAINT "_pages_v_blocks_karten_karten_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_karten_karten" ADD CONSTRAINT "_pages_v_blocks_karten_karten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_karten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_karten" ADD CONSTRAINT "_pages_v_blocks_karten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kundenstimmen" ADD CONSTRAINT "_pages_v_blocks_kundenstimmen_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kundenstimmen" ADD CONSTRAINT "_pages_v_blocks_kundenstimmen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_zeilen" ADD CONSTRAINT "_pages_v_blocks_service_zeilen_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_zeilen" ADD CONSTRAINT "_pages_v_blocks_service_zeilen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service" ADD CONSTRAINT "_pages_v_blocks_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_angebote" ADD CONSTRAINT "_pages_v_blocks_angebote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kompetenz_fakten" ADD CONSTRAINT "_pages_v_blocks_kompetenz_fakten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_kompetenz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kompetenz" ADD CONSTRAINT "_pages_v_blocks_kompetenz_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kompetenz" ADD CONSTRAINT "_pages_v_blocks_kompetenz_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kompetenz" ADD CONSTRAINT "_pages_v_blocks_kompetenz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ansprechpartner" ADD CONSTRAINT "_pages_v_blocks_ansprechpartner_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ansprechpartner" ADD CONSTRAINT "_pages_v_blocks_ansprechpartner_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ansprechpartner" ADD CONSTRAINT "_pages_v_blocks_ansprechpartner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ratgeber_teaser" ADD CONSTRAINT "_pages_v_blocks_ratgeber_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band" ADD CONSTRAINT "_pages_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_prozess_schritte" ADD CONSTRAINT "_pages_v_blocks_prozess_schritte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_prozess"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_prozess" ADD CONSTRAINT "_pages_v_blocks_prozess_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_liste_punkte" ADD CONSTRAINT "_pages_v_blocks_liste_punkte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_liste"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_liste" ADD CONSTRAINT "_pages_v_blocks_liste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text" ADD CONSTRAINT "_pages_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_region" ADD CONSTRAINT "_pages_v_blocks_region_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kontakt" ADD CONSTRAINT "_pages_v_blocks_kontakt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_fragen" ADD CONSTRAINT "_pages_v_blocks_faq_fragen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_mitglieder" ADD CONSTRAINT "_pages_v_blocks_team_mitglieder_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_mitglieder" ADD CONSTRAINT "_pages_v_blocks_team_mitglieder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_zeitstrahl_eintraege" ADD CONSTRAINT "_pages_v_blocks_zeitstrahl_eintraege_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_zeitstrahl"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_zeitstrahl" ADD CONSTRAINT "_pages_v_blocks_zeitstrahl_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_referenzen_eintraege" ADD CONSTRAINT "_pages_v_blocks_referenzen_eintraege_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_referenzen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_referenzen" ADD CONSTRAINT "_pages_v_blocks_referenzen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_siegel_punkte" ADD CONSTRAINT "_pages_v_blocks_siegel_punkte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_siegel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_siegel" ADD CONSTRAINT "_pages_v_blocks_siegel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_wertermittlung" ADD CONSTRAINT "_pages_v_blocks_wertermittlung_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_bild_id_media_id_fk" FOREIGN KEY ("version_seo_og_bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_gemeinden_fk" FOREIGN KEY ("gemeinden_id") REFERENCES "public"."gemeinden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "objekte_daten_weitere" ADD CONSTRAINT "objekte_daten_weitere_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."objekte"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "objekte" ADD CONSTRAINT "objekte_seo_og_bild_id_media_id_fk" FOREIGN KEY ("seo_og_bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "objekte_rels" ADD CONSTRAINT "objekte_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."objekte"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "objekte_rels" ADD CONSTRAINT "objekte_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_objekte_v_version_daten_weitere" ADD CONSTRAINT "_objekte_v_version_daten_weitere_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_objekte_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_objekte_v" ADD CONSTRAINT "_objekte_v_parent_id_objekte_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."objekte"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_objekte_v" ADD CONSTRAINT "_objekte_v_version_seo_og_bild_id_media_id_fk" FOREIGN KEY ("version_seo_og_bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_objekte_v_rels" ADD CONSTRAINT "_objekte_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_objekte_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_objekte_v_rels" ADD CONSTRAINT "_objekte_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ratgeber_kurzfassung" ADD CONSTRAINT "ratgeber_kurzfassung_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ratgeber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ratgeber_fragen" ADD CONSTRAINT "ratgeber_fragen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ratgeber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ratgeber" ADD CONSTRAINT "ratgeber_bild_id_media_id_fk" FOREIGN KEY ("bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ratgeber" ADD CONSTRAINT "ratgeber_seo_og_bild_id_media_id_fk" FOREIGN KEY ("seo_og_bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ratgeber_v_version_kurzfassung" ADD CONSTRAINT "_ratgeber_v_version_kurzfassung_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ratgeber_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ratgeber_v_version_fragen" ADD CONSTRAINT "_ratgeber_v_version_fragen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ratgeber_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ratgeber_v" ADD CONSTRAINT "_ratgeber_v_parent_id_ratgeber_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ratgeber"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ratgeber_v" ADD CONSTRAINT "_ratgeber_v_version_bild_id_media_id_fk" FOREIGN KEY ("version_bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ratgeber_v" ADD CONSTRAINT "_ratgeber_v_version_seo_og_bild_id_media_id_fk" FOREIGN KEY ("version_seo_og_bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gemeinden_fragen" ADD CONSTRAINT "gemeinden_fragen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gemeinden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gemeinden" ADD CONSTRAINT "gemeinden_seo_og_bild_id_media_id_fk" FOREIGN KEY ("seo_og_bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gemeinden_v_version_fragen" ADD CONSTRAINT "_gemeinden_v_version_fragen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_gemeinden_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gemeinden_v" ADD CONSTRAINT "_gemeinden_v_parent_id_gemeinden_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gemeinden"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gemeinden_v" ADD CONSTRAINT "_gemeinden_v_version_seo_og_bild_id_media_id_fk" FOREIGN KEY ("version_seo_og_bild_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_objekte_fk" FOREIGN KEY ("objekte_id") REFERENCES "public"."objekte"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ratgeber_fk" FOREIGN KEY ("ratgeber_id") REFERENCES "public"."ratgeber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kundenstimmen_fk" FOREIGN KEY ("kundenstimmen_id") REFERENCES "public"."kundenstimmen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gemeinden_fk" FOREIGN KEY ("gemeinden_id") REFERENCES "public"."gemeinden"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_anfragen_fk" FOREIGN KEY ("anfragen_id") REFERENCES "public"."anfragen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "einstellungen_social" ADD CONSTRAINT "einstellungen_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."einstellungen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_hauptmenue_unterpunkte" ADD CONSTRAINT "navigation_hauptmenue_unterpunkte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_hauptmenue"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_hauptmenue" ADD CONSTRAINT "navigation_hauptmenue_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_szene_kacheln_order_idx" ON "pages_blocks_hero_szene_kacheln" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_szene_kacheln_parent_id_idx" ON "pages_blocks_hero_szene_kacheln" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_szene_kacheln_bild_idx" ON "pages_blocks_hero_szene_kacheln" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_hero_szene_order_idx" ON "pages_blocks_hero_szene" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_szene_parent_id_idx" ON "pages_blocks_hero_szene" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_szene_path_idx" ON "pages_blocks_hero_szene" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_szene_bild_idx" ON "pages_blocks_hero_szene" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_seitenkopf_kacheln_order_idx" ON "pages_blocks_seitenkopf_kacheln" USING btree ("_order");
  CREATE INDEX "pages_blocks_seitenkopf_kacheln_parent_id_idx" ON "pages_blocks_seitenkopf_kacheln" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_seitenkopf_kacheln_bild_idx" ON "pages_blocks_seitenkopf_kacheln" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_seitenkopf_order_idx" ON "pages_blocks_seitenkopf" USING btree ("_order");
  CREATE INDEX "pages_blocks_seitenkopf_parent_id_idx" ON "pages_blocks_seitenkopf" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_seitenkopf_path_idx" ON "pages_blocks_seitenkopf" USING btree ("_path");
  CREATE INDEX "pages_blocks_seitenkopf_bild_idx" ON "pages_blocks_seitenkopf" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_intro_order_idx" ON "pages_blocks_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_intro_parent_id_idx" ON "pages_blocks_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intro_path_idx" ON "pages_blocks_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_warum_order_idx" ON "pages_blocks_warum" USING btree ("_order");
  CREATE INDEX "pages_blocks_warum_parent_id_idx" ON "pages_blocks_warum" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_warum_path_idx" ON "pages_blocks_warum" USING btree ("_path");
  CREATE INDEX "pages_blocks_warum_bild_idx" ON "pages_blocks_warum" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_warum_video_idx" ON "pages_blocks_warum" USING btree ("video_id");
  CREATE INDEX "pages_blocks_pfeile_order_idx" ON "pages_blocks_pfeile" USING btree ("_order");
  CREATE INDEX "pages_blocks_pfeile_parent_id_idx" ON "pages_blocks_pfeile" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pfeile_path_idx" ON "pages_blocks_pfeile" USING btree ("_path");
  CREATE INDEX "pages_blocks_pfeile_bild_links_idx" ON "pages_blocks_pfeile" USING btree ("bild_links_id");
  CREATE INDEX "pages_blocks_pfeile_bild_rechts_idx" ON "pages_blocks_pfeile" USING btree ("bild_rechts_id");
  CREATE INDEX "pages_blocks_stufen_schritte_order_idx" ON "pages_blocks_stufen_schritte" USING btree ("_order");
  CREATE INDEX "pages_blocks_stufen_schritte_parent_id_idx" ON "pages_blocks_stufen_schritte" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stufen_order_idx" ON "pages_blocks_stufen" USING btree ("_order");
  CREATE INDEX "pages_blocks_stufen_parent_id_idx" ON "pages_blocks_stufen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stufen_path_idx" ON "pages_blocks_stufen" USING btree ("_path");
  CREATE INDEX "pages_blocks_karten_karten_order_idx" ON "pages_blocks_karten_karten" USING btree ("_order");
  CREATE INDEX "pages_blocks_karten_karten_parent_id_idx" ON "pages_blocks_karten_karten" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_karten_karten_bild_idx" ON "pages_blocks_karten_karten" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_karten_order_idx" ON "pages_blocks_karten" USING btree ("_order");
  CREATE INDEX "pages_blocks_karten_parent_id_idx" ON "pages_blocks_karten" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_karten_path_idx" ON "pages_blocks_karten" USING btree ("_path");
  CREATE INDEX "pages_blocks_kundenstimmen_order_idx" ON "pages_blocks_kundenstimmen" USING btree ("_order");
  CREATE INDEX "pages_blocks_kundenstimmen_parent_id_idx" ON "pages_blocks_kundenstimmen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_kundenstimmen_path_idx" ON "pages_blocks_kundenstimmen" USING btree ("_path");
  CREATE INDEX "pages_blocks_kundenstimmen_bild_idx" ON "pages_blocks_kundenstimmen" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_service_zeilen_order_idx" ON "pages_blocks_service_zeilen" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_zeilen_parent_id_idx" ON "pages_blocks_service_zeilen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_zeilen_bild_idx" ON "pages_blocks_service_zeilen" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_service_order_idx" ON "pages_blocks_service" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_parent_id_idx" ON "pages_blocks_service" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_path_idx" ON "pages_blocks_service" USING btree ("_path");
  CREATE INDEX "pages_blocks_angebote_order_idx" ON "pages_blocks_angebote" USING btree ("_order");
  CREATE INDEX "pages_blocks_angebote_parent_id_idx" ON "pages_blocks_angebote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_angebote_path_idx" ON "pages_blocks_angebote" USING btree ("_path");
  CREATE INDEX "pages_blocks_kompetenz_fakten_order_idx" ON "pages_blocks_kompetenz_fakten" USING btree ("_order");
  CREATE INDEX "pages_blocks_kompetenz_fakten_parent_id_idx" ON "pages_blocks_kompetenz_fakten" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_kompetenz_order_idx" ON "pages_blocks_kompetenz" USING btree ("_order");
  CREATE INDEX "pages_blocks_kompetenz_parent_id_idx" ON "pages_blocks_kompetenz" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_kompetenz_path_idx" ON "pages_blocks_kompetenz" USING btree ("_path");
  CREATE INDEX "pages_blocks_kompetenz_portrait_idx" ON "pages_blocks_kompetenz" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_kompetenz_bild_idx" ON "pages_blocks_kompetenz" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_ansprechpartner_order_idx" ON "pages_blocks_ansprechpartner" USING btree ("_order");
  CREATE INDEX "pages_blocks_ansprechpartner_parent_id_idx" ON "pages_blocks_ansprechpartner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ansprechpartner_path_idx" ON "pages_blocks_ansprechpartner" USING btree ("_path");
  CREATE INDEX "pages_blocks_ansprechpartner_portrait_idx" ON "pages_blocks_ansprechpartner" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_ansprechpartner_bild_idx" ON "pages_blocks_ansprechpartner" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_ratgeber_teaser_order_idx" ON "pages_blocks_ratgeber_teaser" USING btree ("_order");
  CREATE INDEX "pages_blocks_ratgeber_teaser_parent_id_idx" ON "pages_blocks_ratgeber_teaser" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ratgeber_teaser_path_idx" ON "pages_blocks_ratgeber_teaser" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_buttons_order_idx" ON "pages_blocks_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_buttons_parent_id_idx" ON "pages_blocks_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_bild_idx" ON "pages_blocks_cta" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_cta_band_order_idx" ON "pages_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_parent_id_idx" ON "pages_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_path_idx" ON "pages_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_prozess_schritte_order_idx" ON "pages_blocks_prozess_schritte" USING btree ("_order");
  CREATE INDEX "pages_blocks_prozess_schritte_parent_id_idx" ON "pages_blocks_prozess_schritte" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_prozess_order_idx" ON "pages_blocks_prozess" USING btree ("_order");
  CREATE INDEX "pages_blocks_prozess_parent_id_idx" ON "pages_blocks_prozess" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_prozess_path_idx" ON "pages_blocks_prozess" USING btree ("_path");
  CREATE INDEX "pages_blocks_liste_punkte_order_idx" ON "pages_blocks_liste_punkte" USING btree ("_order");
  CREATE INDEX "pages_blocks_liste_punkte_parent_id_idx" ON "pages_blocks_liste_punkte" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_liste_order_idx" ON "pages_blocks_liste" USING btree ("_order");
  CREATE INDEX "pages_blocks_liste_parent_id_idx" ON "pages_blocks_liste" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_liste_path_idx" ON "pages_blocks_liste" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_order_idx" ON "pages_blocks_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_parent_id_idx" ON "pages_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_path_idx" ON "pages_blocks_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_region_order_idx" ON "pages_blocks_region" USING btree ("_order");
  CREATE INDEX "pages_blocks_region_parent_id_idx" ON "pages_blocks_region" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_region_path_idx" ON "pages_blocks_region" USING btree ("_path");
  CREATE INDEX "pages_blocks_kontakt_order_idx" ON "pages_blocks_kontakt" USING btree ("_order");
  CREATE INDEX "pages_blocks_kontakt_parent_id_idx" ON "pages_blocks_kontakt" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_kontakt_path_idx" ON "pages_blocks_kontakt" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_fragen_order_idx" ON "pages_blocks_faq_fragen" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_fragen_parent_id_idx" ON "pages_blocks_faq_fragen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_mitglieder_order_idx" ON "pages_blocks_team_mitglieder" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_mitglieder_parent_id_idx" ON "pages_blocks_team_mitglieder" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_mitglieder_bild_idx" ON "pages_blocks_team_mitglieder" USING btree ("bild_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_zeitstrahl_eintraege_order_idx" ON "pages_blocks_zeitstrahl_eintraege" USING btree ("_order");
  CREATE INDEX "pages_blocks_zeitstrahl_eintraege_parent_id_idx" ON "pages_blocks_zeitstrahl_eintraege" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_zeitstrahl_order_idx" ON "pages_blocks_zeitstrahl" USING btree ("_order");
  CREATE INDEX "pages_blocks_zeitstrahl_parent_id_idx" ON "pages_blocks_zeitstrahl" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_zeitstrahl_path_idx" ON "pages_blocks_zeitstrahl" USING btree ("_path");
  CREATE INDEX "pages_blocks_referenzen_eintraege_order_idx" ON "pages_blocks_referenzen_eintraege" USING btree ("_order");
  CREATE INDEX "pages_blocks_referenzen_eintraege_parent_id_idx" ON "pages_blocks_referenzen_eintraege" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_referenzen_order_idx" ON "pages_blocks_referenzen" USING btree ("_order");
  CREATE INDEX "pages_blocks_referenzen_parent_id_idx" ON "pages_blocks_referenzen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_referenzen_path_idx" ON "pages_blocks_referenzen" USING btree ("_path");
  CREATE INDEX "pages_blocks_siegel_punkte_order_idx" ON "pages_blocks_siegel_punkte" USING btree ("_order");
  CREATE INDEX "pages_blocks_siegel_punkte_parent_id_idx" ON "pages_blocks_siegel_punkte" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_siegel_order_idx" ON "pages_blocks_siegel" USING btree ("_order");
  CREATE INDEX "pages_blocks_siegel_parent_id_idx" ON "pages_blocks_siegel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_siegel_path_idx" ON "pages_blocks_siegel" USING btree ("_path");
  CREATE INDEX "pages_blocks_wertermittlung_order_idx" ON "pages_blocks_wertermittlung" USING btree ("_order");
  CREATE INDEX "pages_blocks_wertermittlung_parent_id_idx" ON "pages_blocks_wertermittlung" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_wertermittlung_path_idx" ON "pages_blocks_wertermittlung" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_pfad_idx" ON "pages" USING btree ("pfad");
  CREATE INDEX "pages_seo_seo_og_bild_idx" ON "pages" USING btree ("seo_og_bild_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_gemeinden_id_idx" ON "pages_rels" USING btree ("gemeinden_id");
  CREATE INDEX "_pages_v_blocks_hero_szene_kacheln_order_idx" ON "_pages_v_blocks_hero_szene_kacheln" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_szene_kacheln_parent_id_idx" ON "_pages_v_blocks_hero_szene_kacheln" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_szene_kacheln_bild_idx" ON "_pages_v_blocks_hero_szene_kacheln" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_hero_szene_order_idx" ON "_pages_v_blocks_hero_szene" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_szene_parent_id_idx" ON "_pages_v_blocks_hero_szene" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_szene_path_idx" ON "_pages_v_blocks_hero_szene" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_szene_bild_idx" ON "_pages_v_blocks_hero_szene" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_seitenkopf_kacheln_order_idx" ON "_pages_v_blocks_seitenkopf_kacheln" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_seitenkopf_kacheln_parent_id_idx" ON "_pages_v_blocks_seitenkopf_kacheln" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_seitenkopf_kacheln_bild_idx" ON "_pages_v_blocks_seitenkopf_kacheln" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_seitenkopf_order_idx" ON "_pages_v_blocks_seitenkopf" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_seitenkopf_parent_id_idx" ON "_pages_v_blocks_seitenkopf" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_seitenkopf_path_idx" ON "_pages_v_blocks_seitenkopf" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_seitenkopf_bild_idx" ON "_pages_v_blocks_seitenkopf" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_intro_order_idx" ON "_pages_v_blocks_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_intro_parent_id_idx" ON "_pages_v_blocks_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_intro_path_idx" ON "_pages_v_blocks_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_warum_order_idx" ON "_pages_v_blocks_warum" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_warum_parent_id_idx" ON "_pages_v_blocks_warum" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_warum_path_idx" ON "_pages_v_blocks_warum" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_warum_bild_idx" ON "_pages_v_blocks_warum" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_warum_video_idx" ON "_pages_v_blocks_warum" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_pfeile_order_idx" ON "_pages_v_blocks_pfeile" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pfeile_parent_id_idx" ON "_pages_v_blocks_pfeile" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pfeile_path_idx" ON "_pages_v_blocks_pfeile" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pfeile_bild_links_idx" ON "_pages_v_blocks_pfeile" USING btree ("bild_links_id");
  CREATE INDEX "_pages_v_blocks_pfeile_bild_rechts_idx" ON "_pages_v_blocks_pfeile" USING btree ("bild_rechts_id");
  CREATE INDEX "_pages_v_blocks_stufen_schritte_order_idx" ON "_pages_v_blocks_stufen_schritte" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stufen_schritte_parent_id_idx" ON "_pages_v_blocks_stufen_schritte" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stufen_order_idx" ON "_pages_v_blocks_stufen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stufen_parent_id_idx" ON "_pages_v_blocks_stufen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stufen_path_idx" ON "_pages_v_blocks_stufen" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_karten_karten_order_idx" ON "_pages_v_blocks_karten_karten" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_karten_karten_parent_id_idx" ON "_pages_v_blocks_karten_karten" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_karten_karten_bild_idx" ON "_pages_v_blocks_karten_karten" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_karten_order_idx" ON "_pages_v_blocks_karten" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_karten_parent_id_idx" ON "_pages_v_blocks_karten" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_karten_path_idx" ON "_pages_v_blocks_karten" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_kundenstimmen_order_idx" ON "_pages_v_blocks_kundenstimmen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_kundenstimmen_parent_id_idx" ON "_pages_v_blocks_kundenstimmen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_kundenstimmen_path_idx" ON "_pages_v_blocks_kundenstimmen" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_kundenstimmen_bild_idx" ON "_pages_v_blocks_kundenstimmen" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_service_zeilen_order_idx" ON "_pages_v_blocks_service_zeilen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_zeilen_parent_id_idx" ON "_pages_v_blocks_service_zeilen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_zeilen_bild_idx" ON "_pages_v_blocks_service_zeilen" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_service_order_idx" ON "_pages_v_blocks_service" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_parent_id_idx" ON "_pages_v_blocks_service" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_path_idx" ON "_pages_v_blocks_service" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_angebote_order_idx" ON "_pages_v_blocks_angebote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_angebote_parent_id_idx" ON "_pages_v_blocks_angebote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_angebote_path_idx" ON "_pages_v_blocks_angebote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_kompetenz_fakten_order_idx" ON "_pages_v_blocks_kompetenz_fakten" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_kompetenz_fakten_parent_id_idx" ON "_pages_v_blocks_kompetenz_fakten" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_kompetenz_order_idx" ON "_pages_v_blocks_kompetenz" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_kompetenz_parent_id_idx" ON "_pages_v_blocks_kompetenz" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_kompetenz_path_idx" ON "_pages_v_blocks_kompetenz" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_kompetenz_portrait_idx" ON "_pages_v_blocks_kompetenz" USING btree ("portrait_id");
  CREATE INDEX "_pages_v_blocks_kompetenz_bild_idx" ON "_pages_v_blocks_kompetenz" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_ansprechpartner_order_idx" ON "_pages_v_blocks_ansprechpartner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ansprechpartner_parent_id_idx" ON "_pages_v_blocks_ansprechpartner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ansprechpartner_path_idx" ON "_pages_v_blocks_ansprechpartner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ansprechpartner_portrait_idx" ON "_pages_v_blocks_ansprechpartner" USING btree ("portrait_id");
  CREATE INDEX "_pages_v_blocks_ansprechpartner_bild_idx" ON "_pages_v_blocks_ansprechpartner" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_ratgeber_teaser_order_idx" ON "_pages_v_blocks_ratgeber_teaser" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ratgeber_teaser_parent_id_idx" ON "_pages_v_blocks_ratgeber_teaser" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ratgeber_teaser_path_idx" ON "_pages_v_blocks_ratgeber_teaser" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_buttons_order_idx" ON "_pages_v_blocks_cta_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_buttons_parent_id_idx" ON "_pages_v_blocks_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_bild_idx" ON "_pages_v_blocks_cta" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_cta_band_order_idx" ON "_pages_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_parent_id_idx" ON "_pages_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_path_idx" ON "_pages_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_prozess_schritte_order_idx" ON "_pages_v_blocks_prozess_schritte" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_prozess_schritte_parent_id_idx" ON "_pages_v_blocks_prozess_schritte" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_prozess_order_idx" ON "_pages_v_blocks_prozess" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_prozess_parent_id_idx" ON "_pages_v_blocks_prozess" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_prozess_path_idx" ON "_pages_v_blocks_prozess" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_liste_punkte_order_idx" ON "_pages_v_blocks_liste_punkte" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_liste_punkte_parent_id_idx" ON "_pages_v_blocks_liste_punkte" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_liste_order_idx" ON "_pages_v_blocks_liste" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_liste_parent_id_idx" ON "_pages_v_blocks_liste" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_liste_path_idx" ON "_pages_v_blocks_liste" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_order_idx" ON "_pages_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_parent_id_idx" ON "_pages_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_path_idx" ON "_pages_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_region_order_idx" ON "_pages_v_blocks_region" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_region_parent_id_idx" ON "_pages_v_blocks_region" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_region_path_idx" ON "_pages_v_blocks_region" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_kontakt_order_idx" ON "_pages_v_blocks_kontakt" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_kontakt_parent_id_idx" ON "_pages_v_blocks_kontakt" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_kontakt_path_idx" ON "_pages_v_blocks_kontakt" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_fragen_order_idx" ON "_pages_v_blocks_faq_fragen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_fragen_parent_id_idx" ON "_pages_v_blocks_faq_fragen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_mitglieder_order_idx" ON "_pages_v_blocks_team_mitglieder" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_mitglieder_parent_id_idx" ON "_pages_v_blocks_team_mitglieder" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_mitglieder_bild_idx" ON "_pages_v_blocks_team_mitglieder" USING btree ("bild_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_zeitstrahl_eintraege_order_idx" ON "_pages_v_blocks_zeitstrahl_eintraege" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_zeitstrahl_eintraege_parent_id_idx" ON "_pages_v_blocks_zeitstrahl_eintraege" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_zeitstrahl_order_idx" ON "_pages_v_blocks_zeitstrahl" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_zeitstrahl_parent_id_idx" ON "_pages_v_blocks_zeitstrahl" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_zeitstrahl_path_idx" ON "_pages_v_blocks_zeitstrahl" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_referenzen_eintraege_order_idx" ON "_pages_v_blocks_referenzen_eintraege" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_referenzen_eintraege_parent_id_idx" ON "_pages_v_blocks_referenzen_eintraege" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_referenzen_order_idx" ON "_pages_v_blocks_referenzen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_referenzen_parent_id_idx" ON "_pages_v_blocks_referenzen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_referenzen_path_idx" ON "_pages_v_blocks_referenzen" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_siegel_punkte_order_idx" ON "_pages_v_blocks_siegel_punkte" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_siegel_punkte_parent_id_idx" ON "_pages_v_blocks_siegel_punkte" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_siegel_order_idx" ON "_pages_v_blocks_siegel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_siegel_parent_id_idx" ON "_pages_v_blocks_siegel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_siegel_path_idx" ON "_pages_v_blocks_siegel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_wertermittlung_order_idx" ON "_pages_v_blocks_wertermittlung" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_wertermittlung_parent_id_idx" ON "_pages_v_blocks_wertermittlung" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_wertermittlung_path_idx" ON "_pages_v_blocks_wertermittlung" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_pfad_idx" ON "_pages_v" USING btree ("version_pfad");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_bild_idx" ON "_pages_v" USING btree ("version_seo_og_bild_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_gemeinden_id_idx" ON "_pages_v_rels" USING btree ("gemeinden_id");
  CREATE INDEX "objekte_daten_weitere_order_idx" ON "objekte_daten_weitere" USING btree ("_order");
  CREATE INDEX "objekte_daten_weitere_parent_id_idx" ON "objekte_daten_weitere" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "objekte_slug_idx" ON "objekte" USING btree ("slug");
  CREATE INDEX "objekte_externe_id_idx" ON "objekte" USING btree ("externe_id");
  CREATE INDEX "objekte_seo_seo_og_bild_idx" ON "objekte" USING btree ("seo_og_bild_id");
  CREATE INDEX "objekte_updated_at_idx" ON "objekte" USING btree ("updated_at");
  CREATE INDEX "objekte_created_at_idx" ON "objekte" USING btree ("created_at");
  CREATE INDEX "objekte__status_idx" ON "objekte" USING btree ("_status");
  CREATE INDEX "objekte_rels_order_idx" ON "objekte_rels" USING btree ("order");
  CREATE INDEX "objekte_rels_parent_idx" ON "objekte_rels" USING btree ("parent_id");
  CREATE INDEX "objekte_rels_path_idx" ON "objekte_rels" USING btree ("path");
  CREATE INDEX "objekte_rels_media_id_idx" ON "objekte_rels" USING btree ("media_id");
  CREATE INDEX "_objekte_v_version_daten_weitere_order_idx" ON "_objekte_v_version_daten_weitere" USING btree ("_order");
  CREATE INDEX "_objekte_v_version_daten_weitere_parent_id_idx" ON "_objekte_v_version_daten_weitere" USING btree ("_parent_id");
  CREATE INDEX "_objekte_v_parent_idx" ON "_objekte_v" USING btree ("parent_id");
  CREATE INDEX "_objekte_v_version_version_slug_idx" ON "_objekte_v" USING btree ("version_slug");
  CREATE INDEX "_objekte_v_version_version_externe_id_idx" ON "_objekte_v" USING btree ("version_externe_id");
  CREATE INDEX "_objekte_v_version_seo_version_seo_og_bild_idx" ON "_objekte_v" USING btree ("version_seo_og_bild_id");
  CREATE INDEX "_objekte_v_version_version_updated_at_idx" ON "_objekte_v" USING btree ("version_updated_at");
  CREATE INDEX "_objekte_v_version_version_created_at_idx" ON "_objekte_v" USING btree ("version_created_at");
  CREATE INDEX "_objekte_v_version_version__status_idx" ON "_objekte_v" USING btree ("version__status");
  CREATE INDEX "_objekte_v_created_at_idx" ON "_objekte_v" USING btree ("created_at");
  CREATE INDEX "_objekte_v_updated_at_idx" ON "_objekte_v" USING btree ("updated_at");
  CREATE INDEX "_objekte_v_latest_idx" ON "_objekte_v" USING btree ("latest");
  CREATE INDEX "_objekte_v_rels_order_idx" ON "_objekte_v_rels" USING btree ("order");
  CREATE INDEX "_objekte_v_rels_parent_idx" ON "_objekte_v_rels" USING btree ("parent_id");
  CREATE INDEX "_objekte_v_rels_path_idx" ON "_objekte_v_rels" USING btree ("path");
  CREATE INDEX "_objekte_v_rels_media_id_idx" ON "_objekte_v_rels" USING btree ("media_id");
  CREATE INDEX "ratgeber_kurzfassung_order_idx" ON "ratgeber_kurzfassung" USING btree ("_order");
  CREATE INDEX "ratgeber_kurzfassung_parent_id_idx" ON "ratgeber_kurzfassung" USING btree ("_parent_id");
  CREATE INDEX "ratgeber_fragen_order_idx" ON "ratgeber_fragen" USING btree ("_order");
  CREATE INDEX "ratgeber_fragen_parent_id_idx" ON "ratgeber_fragen" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ratgeber_slug_idx" ON "ratgeber" USING btree ("slug");
  CREATE INDEX "ratgeber_bild_idx" ON "ratgeber" USING btree ("bild_id");
  CREATE INDEX "ratgeber_seo_seo_og_bild_idx" ON "ratgeber" USING btree ("seo_og_bild_id");
  CREATE INDEX "ratgeber_updated_at_idx" ON "ratgeber" USING btree ("updated_at");
  CREATE INDEX "ratgeber_created_at_idx" ON "ratgeber" USING btree ("created_at");
  CREATE INDEX "ratgeber__status_idx" ON "ratgeber" USING btree ("_status");
  CREATE INDEX "_ratgeber_v_version_kurzfassung_order_idx" ON "_ratgeber_v_version_kurzfassung" USING btree ("_order");
  CREATE INDEX "_ratgeber_v_version_kurzfassung_parent_id_idx" ON "_ratgeber_v_version_kurzfassung" USING btree ("_parent_id");
  CREATE INDEX "_ratgeber_v_version_fragen_order_idx" ON "_ratgeber_v_version_fragen" USING btree ("_order");
  CREATE INDEX "_ratgeber_v_version_fragen_parent_id_idx" ON "_ratgeber_v_version_fragen" USING btree ("_parent_id");
  CREATE INDEX "_ratgeber_v_parent_idx" ON "_ratgeber_v" USING btree ("parent_id");
  CREATE INDEX "_ratgeber_v_version_version_slug_idx" ON "_ratgeber_v" USING btree ("version_slug");
  CREATE INDEX "_ratgeber_v_version_version_bild_idx" ON "_ratgeber_v" USING btree ("version_bild_id");
  CREATE INDEX "_ratgeber_v_version_seo_version_seo_og_bild_idx" ON "_ratgeber_v" USING btree ("version_seo_og_bild_id");
  CREATE INDEX "_ratgeber_v_version_version_updated_at_idx" ON "_ratgeber_v" USING btree ("version_updated_at");
  CREATE INDEX "_ratgeber_v_version_version_created_at_idx" ON "_ratgeber_v" USING btree ("version_created_at");
  CREATE INDEX "_ratgeber_v_version_version__status_idx" ON "_ratgeber_v" USING btree ("version__status");
  CREATE INDEX "_ratgeber_v_created_at_idx" ON "_ratgeber_v" USING btree ("created_at");
  CREATE INDEX "_ratgeber_v_updated_at_idx" ON "_ratgeber_v" USING btree ("updated_at");
  CREATE INDEX "_ratgeber_v_latest_idx" ON "_ratgeber_v" USING btree ("latest");
  CREATE INDEX "kundenstimmen_updated_at_idx" ON "kundenstimmen" USING btree ("updated_at");
  CREATE INDEX "kundenstimmen_created_at_idx" ON "kundenstimmen" USING btree ("created_at");
  CREATE INDEX "gemeinden_fragen_order_idx" ON "gemeinden_fragen" USING btree ("_order");
  CREATE INDEX "gemeinden_fragen_parent_id_idx" ON "gemeinden_fragen" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "gemeinden_slug_idx" ON "gemeinden" USING btree ("slug");
  CREATE INDEX "gemeinden_seo_seo_og_bild_idx" ON "gemeinden" USING btree ("seo_og_bild_id");
  CREATE INDEX "gemeinden_updated_at_idx" ON "gemeinden" USING btree ("updated_at");
  CREATE INDEX "gemeinden_created_at_idx" ON "gemeinden" USING btree ("created_at");
  CREATE INDEX "gemeinden__status_idx" ON "gemeinden" USING btree ("_status");
  CREATE INDEX "_gemeinden_v_version_fragen_order_idx" ON "_gemeinden_v_version_fragen" USING btree ("_order");
  CREATE INDEX "_gemeinden_v_version_fragen_parent_id_idx" ON "_gemeinden_v_version_fragen" USING btree ("_parent_id");
  CREATE INDEX "_gemeinden_v_parent_idx" ON "_gemeinden_v" USING btree ("parent_id");
  CREATE INDEX "_gemeinden_v_version_version_slug_idx" ON "_gemeinden_v" USING btree ("version_slug");
  CREATE INDEX "_gemeinden_v_version_seo_version_seo_og_bild_idx" ON "_gemeinden_v" USING btree ("version_seo_og_bild_id");
  CREATE INDEX "_gemeinden_v_version_version_updated_at_idx" ON "_gemeinden_v" USING btree ("version_updated_at");
  CREATE INDEX "_gemeinden_v_version_version_created_at_idx" ON "_gemeinden_v" USING btree ("version_created_at");
  CREATE INDEX "_gemeinden_v_version_version__status_idx" ON "_gemeinden_v" USING btree ("version__status");
  CREATE INDEX "_gemeinden_v_created_at_idx" ON "_gemeinden_v" USING btree ("created_at");
  CREATE INDEX "_gemeinden_v_updated_at_idx" ON "_gemeinden_v" USING btree ("updated_at");
  CREATE INDEX "_gemeinden_v_latest_idx" ON "_gemeinden_v" USING btree ("latest");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_klein_sizes_klein_filename_idx" ON "media" USING btree ("sizes_klein_filename");
  CREATE INDEX "media_sizes_mittel_sizes_mittel_filename_idx" ON "media" USING btree ("sizes_mittel_filename");
  CREATE INDEX "media_sizes_gross_sizes_gross_filename_idx" ON "media" USING btree ("sizes_gross_filename");
  CREATE INDEX "anfragen_updated_at_idx" ON "anfragen" USING btree ("updated_at");
  CREATE INDEX "anfragen_created_at_idx" ON "anfragen" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_objekte_id_idx" ON "payload_locked_documents_rels" USING btree ("objekte_id");
  CREATE INDEX "payload_locked_documents_rels_ratgeber_id_idx" ON "payload_locked_documents_rels" USING btree ("ratgeber_id");
  CREATE INDEX "payload_locked_documents_rels_kundenstimmen_id_idx" ON "payload_locked_documents_rels" USING btree ("kundenstimmen_id");
  CREATE INDEX "payload_locked_documents_rels_gemeinden_id_idx" ON "payload_locked_documents_rels" USING btree ("gemeinden_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_anfragen_id_idx" ON "payload_locked_documents_rels" USING btree ("anfragen_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "einstellungen_social_order_idx" ON "einstellungen_social" USING btree ("_order");
  CREATE INDEX "einstellungen_social_parent_id_idx" ON "einstellungen_social" USING btree ("_parent_id");
  CREATE INDEX "navigation_hauptmenue_unterpunkte_order_idx" ON "navigation_hauptmenue_unterpunkte" USING btree ("_order");
  CREATE INDEX "navigation_hauptmenue_unterpunkte_parent_id_idx" ON "navigation_hauptmenue_unterpunkte" USING btree ("_parent_id");
  CREATE INDEX "navigation_hauptmenue_order_idx" ON "navigation_hauptmenue" USING btree ("_order");
  CREATE INDEX "navigation_hauptmenue_parent_id_idx" ON "navigation_hauptmenue" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_szene_kacheln" CASCADE;
  DROP TABLE "pages_blocks_hero_szene" CASCADE;
  DROP TABLE "pages_blocks_seitenkopf_kacheln" CASCADE;
  DROP TABLE "pages_blocks_seitenkopf" CASCADE;
  DROP TABLE "pages_blocks_intro" CASCADE;
  DROP TABLE "pages_blocks_warum" CASCADE;
  DROP TABLE "pages_blocks_pfeile" CASCADE;
  DROP TABLE "pages_blocks_stufen_schritte" CASCADE;
  DROP TABLE "pages_blocks_stufen" CASCADE;
  DROP TABLE "pages_blocks_karten_karten" CASCADE;
  DROP TABLE "pages_blocks_karten" CASCADE;
  DROP TABLE "pages_blocks_kundenstimmen" CASCADE;
  DROP TABLE "pages_blocks_service_zeilen" CASCADE;
  DROP TABLE "pages_blocks_service" CASCADE;
  DROP TABLE "pages_blocks_angebote" CASCADE;
  DROP TABLE "pages_blocks_kompetenz_fakten" CASCADE;
  DROP TABLE "pages_blocks_kompetenz" CASCADE;
  DROP TABLE "pages_blocks_ansprechpartner" CASCADE;
  DROP TABLE "pages_blocks_ratgeber_teaser" CASCADE;
  DROP TABLE "pages_blocks_cta_buttons" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_band" CASCADE;
  DROP TABLE "pages_blocks_prozess_schritte" CASCADE;
  DROP TABLE "pages_blocks_prozess" CASCADE;
  DROP TABLE "pages_blocks_liste_punkte" CASCADE;
  DROP TABLE "pages_blocks_liste" CASCADE;
  DROP TABLE "pages_blocks_text" CASCADE;
  DROP TABLE "pages_blocks_region" CASCADE;
  DROP TABLE "pages_blocks_kontakt" CASCADE;
  DROP TABLE "pages_blocks_faq_fragen" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_team_mitglieder" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_zeitstrahl_eintraege" CASCADE;
  DROP TABLE "pages_blocks_zeitstrahl" CASCADE;
  DROP TABLE "pages_blocks_referenzen_eintraege" CASCADE;
  DROP TABLE "pages_blocks_referenzen" CASCADE;
  DROP TABLE "pages_blocks_siegel_punkte" CASCADE;
  DROP TABLE "pages_blocks_siegel" CASCADE;
  DROP TABLE "pages_blocks_wertermittlung" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_szene_kacheln" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_szene" CASCADE;
  DROP TABLE "_pages_v_blocks_seitenkopf_kacheln" CASCADE;
  DROP TABLE "_pages_v_blocks_seitenkopf" CASCADE;
  DROP TABLE "_pages_v_blocks_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_warum" CASCADE;
  DROP TABLE "_pages_v_blocks_pfeile" CASCADE;
  DROP TABLE "_pages_v_blocks_stufen_schritte" CASCADE;
  DROP TABLE "_pages_v_blocks_stufen" CASCADE;
  DROP TABLE "_pages_v_blocks_karten_karten" CASCADE;
  DROP TABLE "_pages_v_blocks_karten" CASCADE;
  DROP TABLE "_pages_v_blocks_kundenstimmen" CASCADE;
  DROP TABLE "_pages_v_blocks_service_zeilen" CASCADE;
  DROP TABLE "_pages_v_blocks_service" CASCADE;
  DROP TABLE "_pages_v_blocks_angebote" CASCADE;
  DROP TABLE "_pages_v_blocks_kompetenz_fakten" CASCADE;
  DROP TABLE "_pages_v_blocks_kompetenz" CASCADE;
  DROP TABLE "_pages_v_blocks_ansprechpartner" CASCADE;
  DROP TABLE "_pages_v_blocks_ratgeber_teaser" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band" CASCADE;
  DROP TABLE "_pages_v_blocks_prozess_schritte" CASCADE;
  DROP TABLE "_pages_v_blocks_prozess" CASCADE;
  DROP TABLE "_pages_v_blocks_liste_punkte" CASCADE;
  DROP TABLE "_pages_v_blocks_liste" CASCADE;
  DROP TABLE "_pages_v_blocks_text" CASCADE;
  DROP TABLE "_pages_v_blocks_region" CASCADE;
  DROP TABLE "_pages_v_blocks_kontakt" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_fragen" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_team_mitglieder" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_zeitstrahl_eintraege" CASCADE;
  DROP TABLE "_pages_v_blocks_zeitstrahl" CASCADE;
  DROP TABLE "_pages_v_blocks_referenzen_eintraege" CASCADE;
  DROP TABLE "_pages_v_blocks_referenzen" CASCADE;
  DROP TABLE "_pages_v_blocks_siegel_punkte" CASCADE;
  DROP TABLE "_pages_v_blocks_siegel" CASCADE;
  DROP TABLE "_pages_v_blocks_wertermittlung" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "objekte_daten_weitere" CASCADE;
  DROP TABLE "objekte" CASCADE;
  DROP TABLE "objekte_rels" CASCADE;
  DROP TABLE "_objekte_v_version_daten_weitere" CASCADE;
  DROP TABLE "_objekte_v" CASCADE;
  DROP TABLE "_objekte_v_rels" CASCADE;
  DROP TABLE "ratgeber_kurzfassung" CASCADE;
  DROP TABLE "ratgeber_fragen" CASCADE;
  DROP TABLE "ratgeber" CASCADE;
  DROP TABLE "_ratgeber_v_version_kurzfassung" CASCADE;
  DROP TABLE "_ratgeber_v_version_fragen" CASCADE;
  DROP TABLE "_ratgeber_v" CASCADE;
  DROP TABLE "kundenstimmen" CASCADE;
  DROP TABLE "gemeinden_fragen" CASCADE;
  DROP TABLE "gemeinden" CASCADE;
  DROP TABLE "_gemeinden_v_version_fragen" CASCADE;
  DROP TABLE "_gemeinden_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "anfragen" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "einstellungen_social" CASCADE;
  DROP TABLE "einstellungen" CASCADE;
  DROP TABLE "navigation_hauptmenue_unterpunkte" CASCADE;
  DROP TABLE "navigation_hauptmenue" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_karten_karten_icon";
  DROP TYPE "public"."enum_pages_blocks_karten_hintergrund";
  DROP TYPE "public"."enum_pages_blocks_angebote_vermarktung";
  DROP TYPE "public"."enum_pages_blocks_liste_hintergrund";
  DROP TYPE "public"."enum_pages_blocks_kontakt_formular";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_karten_karten_icon";
  DROP TYPE "public"."enum__pages_v_blocks_karten_hintergrund";
  DROP TYPE "public"."enum__pages_v_blocks_angebote_vermarktung";
  DROP TYPE "public"."enum__pages_v_blocks_liste_hintergrund";
  DROP TYPE "public"."enum__pages_v_blocks_kontakt_formular";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_objekte_vermarktung";
  DROP TYPE "public"."enum_objekte_objektart";
  DROP TYPE "public"."enum_objekte_objektstatus";
  DROP TYPE "public"."enum_objekte_energie_art";
  DROP TYPE "public"."enum_objekte_energie_klasse";
  DROP TYPE "public"."enum_objekte_status";
  DROP TYPE "public"."enum__objekte_v_version_vermarktung";
  DROP TYPE "public"."enum__objekte_v_version_objektart";
  DROP TYPE "public"."enum__objekte_v_version_objektstatus";
  DROP TYPE "public"."enum__objekte_v_version_energie_art";
  DROP TYPE "public"."enum__objekte_v_version_energie_klasse";
  DROP TYPE "public"."enum__objekte_v_version_status";
  DROP TYPE "public"."enum_ratgeber_status";
  DROP TYPE "public"."enum__ratgeber_v_version_status";
  DROP TYPE "public"."enum_gemeinden_status";
  DROP TYPE "public"."enum__gemeinden_v_version_status";
  DROP TYPE "public"."enum_anfragen_typ";
  DROP TYPE "public"."enum_users_rolle";`)
}
