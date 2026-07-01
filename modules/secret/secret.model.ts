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
    value: {
      type: String,
      required: true,
      trim: true,
    },
    encryptionVersion: {
      type: Number,
      default: 1,
      required: false,
      select: false,
    },
    favourite: {
      type: Boolean,
      required: true,
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

export type SecretType = Omit<
  InferSchemaType<typeof secretSchema>,
  "projectId"
> & { _id: string; projectId?: string };

export type CreateSecretType = Pick<
  SecretType,
  "userId" | "projectId" | "name" | "value" | "favourite"
>;

export type UpdateSecretType = Pick<
  SecretType,
  "name" | "value" | "favourite"
> & { _id: string };

export const SecretModel =
  mongoose.models.Secret || mongoose.model("Secret", secretSchema);
