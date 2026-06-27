FROM node:23-alpine AS builder

WORKDIR /app
# Copy root configuration files
COPY package.json package-lock.json tsconfig.json turbo.json ./
# Copy workspace definitions
COPY packages ./packages
COPY apps/api ./apps/api

# Install dependencies and build
RUN npm ci
RUN npm run build --workspace=apps/api

FROM node:23-alpine AS runner
WORKDIR /app

# Copy production dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/database/node_modules ./packages/database/node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/packages/config ./packages/config

EXPOSE 3001
ENV NODE_ENV=production
CMD ["node", "apps/api/dist/main"]
