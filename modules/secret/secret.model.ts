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

secretSchema.index(
  {
    projectId: 1,
    name: 1,
  },
  { unique: true },
);

secretSchema.index({
  userId: 1,
  createdAt: -1,
});

secretSchema.index({
  projectId: 1,
});

secretSchema.index({
  userId: 1,
  favourite: 1,
  createdAt: -1,
});

type SecretType = InferSchemaType<typeof secretSchema>;

export type CreateSecretType = Pick<
  SecretType,
  "userId" | "projectId" | "name" | "valueType" | "value" | "favourite"
>;

export type UpdateSecretType = Pick<
  SecretType,
  "name" | "valueType" | "value" | "favourite"
> & { _id: string };

export const SecretModel =
  mongoose.models.Secret || mongoose.model("Secret", secretSchema);
