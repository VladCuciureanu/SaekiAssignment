import dotenv from "dotenv";
import z from "zod";

export const Environments = z.enum(["development", "production", "test"]);

const EnvironmentVariablesSchema = z.object({
  NODE_ENV: Environments.default("development"),
  FRONTEND_URL: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET_KEY: z.string().min(1),
  PORT: z.number().default(3001),
});

function getEnv() {
  dotenv.config();
  return EnvironmentVariablesSchema.parse(process.env);
}

export const env = getEnv();
