import { Hono } from "hono";
import { BlogController } from "./blog.controller";
import { AccessMiddleware } from "@/core/utils/middleware/access_middleware";

const blogRoute = new Hono();
const accessMiddleware = new AccessMiddleware();

blogRoute.post(
  "/",
  accessMiddleware.authenticate,
  accessMiddleware.authorize("SUPER"),
  BlogController.create
);
blogRoute.get("/", BlogController.getBlogs);
blogRoute.get("/:slug", BlogController.getBlog);
blogRoute.patch(
  "/:slug",
  accessMiddleware.authenticate,
  accessMiddleware.authorize("SUPER"),
  BlogController.updateBlog
);
blogRoute.delete(
  "/:slug",
  accessMiddleware.authenticate,
  accessMiddleware.authorize("SUPER"),
  BlogController.deleteBlog
);

export default blogRoute;
