import mongoose, { InferSchemaType } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    favourite: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

type ProjectType = InferSchemaType<typeof projectSchema>;

export type CreateProjectType = Pick<
  ProjectType,
  "userId" | "name" | "favourite"
>;

export const ProjectModel =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
