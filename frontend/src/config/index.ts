import { Config } from "./types";

const env =
  process.env.NODE_ENV === "production"
    ? { API_URL: "http://el-prom.docker.local:8000" }
    : { API_URL: "http://localhost:3001" };
console.log({ env });
console.log("process.env:", process.env);
export const AppConfig: Config = env;
