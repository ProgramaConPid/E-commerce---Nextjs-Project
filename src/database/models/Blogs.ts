import { model, models, Schema } from "mongoose";
import { IBlog } from "@/interfaces/main";

const blogSchema = new Schema<IBlog>({
  image: { type: String, require: true },
  type: { type: String },
  title: { type: String, require: true },
  description: { type: String, require: true }
}, {
  collection: "blogs"
})

export const Blogs = models.Blogs || model("Blogs", blogSchema);