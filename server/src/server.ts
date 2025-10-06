import app from ".";
import env from "./core/utils/env";
import logger from "@/core/utils/logger";

const port = env.PORT || "8999";

logger.info(`Server running on ${port}`, {
  actions: "Started Server",
});

Bun.serve({
  fetch: app.fetch,
  port,
});
