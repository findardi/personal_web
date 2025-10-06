import db from "@/core/utils/database/connection";
import { CreateBlogInput, UpdateBlogInput } from "./dto/create.blog.dto";
import { blog } from "@/core/utils/database/schema/blog";
import { BadRequest, NotFound } from "@/core/utils/error/error-handler";
import { eq } from "drizzle-orm";

export class BlogService {
  async createBlog(request: CreateBlogInput) {
    const { title, slug, description, content, tags } = request;

    try {
      const [result] = await db
        .insert(blog)
        .values({
          title: title,
          slug: slug,
          content: content,
          tags: tags,
          description: description,
        })
        .returning({ slug: blog.slug });

      if (!result) {
        throw new BadRequest("failed to create new blog");
      }

      return result.slug;
    } catch (error) {
      throw error;
    }
  }

  async getBlogs() {
    try {
      const result = await db.select().from(blog);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBlog(slug: string) {
    try {
      const result = await db.select().from(blog).where(eq(blog.slug, slug));

      if (!result) {
        throw new NotFound(`blog ${slug} not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateBlog(slug: string, request: Partial<UpdateBlogInput>) {
    try {
      const [result] = await db
        .update(blog)
        .set({
          ...request,
          updatedAt: new Date(),
        })
        .where(eq(blog.slug, slug))
        .returning({ slug: blog.slug });

      if (!result) {
        throw new NotFound(`Blog with slug ${slug} not found`);
      }

      return result.slug;
    } catch (error) {
      throw error;
    }
  }

  async deleteBlog(slug: string) {
    try {
      const [result] = await db
        .delete(blog)
        .where(eq(blog.slug, slug))
        .returning({ slug: blog.slug });

      if (!result) {
        throw new NotFound(`Blog with slug ${slug} not found`);
      }

      return result.slug;
    } catch (error) {
      throw error;
    }
  }
}
