FROM node:23-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json turbo.json ./
COPY packages ./packages
COPY apps/web ./apps/web

RUN npm install
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma
RUN npm run build --workspace=apps/web

FROM node:23-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 3000
ENV PORT=3000

CMD ["node", "apps/web/server.js"]
