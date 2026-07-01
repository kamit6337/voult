import { decrypt } from "@/lib/crypto";
import { SECRET } from "@/types/secret";

export function serializeSecret(secret: any): SECRET {
  const obj = secret.toObject();

  return {
    ...obj,
    _id: obj._id.toString(),
    projectId: obj.projectId ? obj.projectId._id.toString() : null,
    value: decrypt(obj.value),
  };
}
