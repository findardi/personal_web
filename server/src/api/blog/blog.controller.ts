import { Context } from "hono";
import { BlogService } from "./blog.service";
import { createBlogSchema, updateBlogSchema } from "./dto/create.blog.dto";
import { Response } from "@/core/constant/api-response";
import { HTTP_STATUS } from "@/core/constant/http-code";

const blogService = new BlogService();

export const BlogController = {
  create: async (c: Context) => {
    const body = await c.req.json();
    const data = createBlogSchema.parse(body);
    const result = await blogService.createBlog(data);

    return c.json(
      Response.success("Blog created successfully", result, HTTP_STATUS.CREATED)
    );
  },

  getBlogs: async (c: Context) => {
    const result = await blogService.getBlogs();
    return c.json(
      Response.success("Get Blogs successfully", result, HTTP_STATUS.OK)
    );
  },

  getBlog: async (c: Context) => {
    const slug = c.req.param("slug");
    const result = await blogService.getBlog(slug);
    return c.json(
      Response.success("Get Blog successfully", result, HTTP_STATUS.OK)
    );
  },

  updateBlog: async (c: Context) => {
    const slug = c.req.param("slug");
    const body = await c.req.json();
    const data = updateBlogSchema.parse(body);
    console.log(data);
    const result = await blogService.updateBlog(slug, data);

    return c.json(
      Response.success("Blog update successfully", result, HTTP_STATUS.OK)
    );
  },

  deleteBlog: async (c: Context) => {
    const slug = c.req.param("slug");
    const result = await blogService.deleteBlog(slug);

    return c.json(
      Response.success("Blog delete successfully", result, HTTP_STATUS.OK)
    );
  },
};
