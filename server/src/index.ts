import { Hono } from "hono";
import { cors } from "hono/cors";
import onError from "./core/utils/error/on-error";
import routeNotFound from "./core/utils/error/on-notfound";
import env from "./core/utils/env";
import { Response } from "./core/constant/api-response";
import { HTTP_STATUS } from "./core/constant/http-code";
import blogRoute from "./api/blog/blog.routing";
import userRoute from "./api/user/user.routing";

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: env.APP_ORIGIN,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
    maxAge: 86400,
  })
);

app.get("/api/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/health", (c) => {
  return c.json(Response.success("health", {}, HTTP_STATUS.OK));
});

// blog
app.route("/api/blog", blogRoute);
// user
app.route("/api/user", userRoute);

// routes handle in here
app.onError(onError);
app.notFound(routeNotFound);

export default app;
