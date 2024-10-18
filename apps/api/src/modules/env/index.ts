import dotenv from "dotenv";
import z from "zod";

const EnvironmentVariablesSchema = z.object({
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
