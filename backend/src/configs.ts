import * as dotenv from 'dotenv';

const configs =
  process.env.NODE_ENV === 'development'
    ? { path: `.env${process.env.NODE_ENV}` }
    : { path: `.env` };

dotenv.config(configs);
export default {
  postgres: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres',
  },
  port: process.env.API_PORT || 3001,
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    ttl: Number(process.env.TTL) || 14400,
  },
  admin: {
    name: process.env.DEFAULT_ADMIN_NAME || 'admin',
    email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@admin.com',
    password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin',
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY || 'dev-secret',
    expiresIn: process.env.JWT_EXPIRATION_TIME || 986400,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:3000',
};
