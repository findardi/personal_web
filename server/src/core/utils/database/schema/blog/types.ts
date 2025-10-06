import { InferSelectModel } from "drizzle-orm";
import { blog } from "./blog.schema";

export type IBlog = Omit<InferSelectModel<typeof blog>, "id">;
