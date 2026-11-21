# Payload CMS (Next.js standalone) für Mittwald Container-Hosting
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Beim Build wird keine Datenbank benötigt – Platzhalter genügen
RUN DATABASE_URL=postgres://build:build@localhost:5432/build PAYLOAD_SECRET=build-only npm run build

# Werkzeug-Image: enthält den Quellcode, um z. B. die Startinhalte einzuspielen
# (docker run … ghcr.io/…/nothhelfer-cms:tools npm run seed)
FROM builder AS tools
ENV NODE_ENV=production MEDIA_DIR=/data/media
CMD ["npm", "run", "seed"]

FROM base AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0 MEDIA_DIR=/data/media
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs \
 && mkdir -p /data/media .next && chown -R nextjs:nodejs /data .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
VOLUME ["/data/media"]
# Datenbank-Migrationen laufen beim Start automatisch (prodMigrations)
CMD ["node", "server.js"]
