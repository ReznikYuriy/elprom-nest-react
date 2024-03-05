type Config = {
  API_URL: string;
};

/* const env = process.env.REACT_APP_API_URL
  ? { API_URL: process.env.REACT_APP_API_URL }
  : { API_URL: "http://localhost:3001" }; */
  const env = { API_URL: "https://el-prom.com.ua" };
export const AppConfig: Config = env;
