# Build stage
FROM oven/bun:1.2-alpine AS build

WORKDIR /app

# Copy dependencies
COPY package.json bun.lock drizzle.config.ts ./
RUN bun install --frozen-lockfile --production

# Copy source code
COPY . .

# Runtime stage
FROM oven/bun:1.2-alpine

WORKDIR /app

# Copy dari build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/bun.lock ./
COPY --from=build /app/drizzle.config.ts ./
COPY --from=build /app/src ./src
COPY --from=build /app/tsconfig.json ./tsconfig.json

# Bersihkan cache
RUN rm -rf /tmp/* /root/.bun/install/cache

EXPOSE 8777

CMD ["bun", "run", "src/server.ts"]