import { Config } from "./types";
import { stagingUrl } from "./staging";
import { productionUrl } from "./production";

const env =
  process.env.REACT_APP_ENV === "production" ? productionUrl : stagingUrl;
console.log(process.env);
export const AppConfig: Config = env;
