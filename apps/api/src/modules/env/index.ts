import dotenv from "dotenv";

function getEnv() {
  dotenv.config();
  return process.env;
}

export const env = getEnv();
