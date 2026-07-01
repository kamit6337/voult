import environment from "@/config/environment";
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY = Buffer.from(environment.SECRET_ENCRYPTION_KEY, "hex");

export function encrypt(text: string) {
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

export function decrypt(encryptedText: string) {
  const buffer = Buffer.from(encryptedText, "base64");

  const iv = buffer.subarray(0, 12);
  const authTag = buffer.subarray(12, 28);
  const encrypted = buffer.subarray(28);

  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);

  decipher.setAuthTag(authTag);

  return decipher.update(encrypted, undefined, "utf8") + decipher.final("utf8");
}
