import mongoose, { InferSchemaType } from "mongoose";

const secretSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    valueType: {
      type: String,
      enum: ["url", "password", "token", "integer", "string"],
      required: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
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

type SecretType = InferSchemaType<typeof secretSchema>;

export type CreateSecretType = Pick<
  SecretType,
  "userId" | "projectId" | "name" | "valueType" | "value" | "favourite"
>;

export const SecretModel = mongoose.model("Secret", secretSchema);
