"use server";

import { SECRET } from "@/types/secret";
import { CreateSecretType } from "./secret.model";
import { requireUserId } from "@/lib/auth";
import { createSecretDB, getSecretsByUserIdDB } from "./secret.db";
import { decrypt, encrypt } from "@/lib/crypto";
import { connectToDB } from "@/config/connectToDB";
import { serializeSecret } from "@/utils/serializeSecret";

type CreateSecretActionType = Pick<
  CreateSecretType,
  "name" | "value" | "favourite" | "projectId"
>;

export const createSecretAction = async (
  data: CreateSecretActionType,
): Promise<SECRET> => {
  const userId = await requireUserId();

  await connectToDB();

  const newSecret = await createSecretDB({
    name: data.name,
    userId,
    value: encrypt(data.value),
    favourite: data.favourite,
  });

  return serializeSecret(newSecret);
};

export const getSecretsByUserIdAction = async (page = 1): Promise<SECRET[]> => {
  const userId = await requireUserId();

  const secrets = await getSecretsByUserIdDB(userId, page);

  if (secrets.length === 0) return [];

  return secrets.map((u) => serializeSecret(u));
};
