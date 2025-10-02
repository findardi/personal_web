# Stage Builder
FROM oven/bun:1.2-alpine AS builder

WORKDIR /app

COPY package.json bun.lock drizzle.config.ts ./
RUN bun install --frozen-lockfile

COPY . .
RUN DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy" bun run build

# Stage Production
FROM oven/bun:1.2-alpine AS production

WORKDIR /app

# Copy hasil build
COPY --from=builder /app/build ./build

# Copy drizzle migrations
COPY --from=builder /app/drizzle ./drizzle


# Copy migration script
COPY --from=builder /app/src/lib/server/db/migration.ts ./migration.ts

# Copy package files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lock ./
COPY --from=builder /app/drizzle.config.ts ./


RUN bun install --production --frozen-lockfile

EXPOSE 8666

# Run migrations lalu start app
CMD ["sh", "-c", "bun run migration.ts && bun run ./build/index.js"]