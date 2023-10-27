import * as dotenv from 'dotenv';

const configs =
  process.env.NODE_ENV === 'development'
    ? { path: `.env${process.env.NODE_ENV}` }
    : { path: `.env` };

dotenv.config(configs);
export default {
  postgres: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  },
  port: process.env.API_PORT || 3001,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: Number(process.env.TTL),
  },
  frontUrl: process.env.FRONT_URL || 'http://localhost:8000',
  backUrl: process.env.BACK_URL || 'http://localhost:8000',
};
