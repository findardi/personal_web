import { InferSelectModel } from "drizzle-orm";
import { user } from "./user.schema";

export type IUser = Omit<InferSelectModel<typeof user>, "id">;
