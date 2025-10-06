# Stage Builder
FROM oven/bun:1.2-alpine AS builder

WORKDIR /app

COPY package.json bun.lock  ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Stage Production
FROM oven/bun:1.2-alpine AS production

WORKDIR /app

# Copy hasil build
COPY --from=builder /app/build ./build

# Copy package files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lock ./

RUN bun install --production --frozen-lockfile

EXPOSE 8666

# Run migrations lalu start app
CMD ["sh", "-c", "bun run ./build/index.js"]