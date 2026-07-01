import z from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().startsWith("mongodb"),
  CLERK_SECRET_KEY: z.string().startsWith("sk_"),
  SECRET_ENCRYPTION_KEY: z.string(),
});

const environment = envSchema.parse(process.env);

export default environment;
