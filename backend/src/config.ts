import dotenv from 'dotenv';

dotenv.config();

export const PORT = Number(process.env.PORT || 3000);

export const DB_ADDRESS =
  process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek';

export const UPLOAD_PATH = process.env.UPLOAD_PATH || 'images';

export const UPLOAD_PATH_TEMP = process.env.UPLOAD_PATH_TEMP || 'temp';

export const ORIGIN_ALLOW = process.env.ORIGIN_ALLOW || 'http://localhost:5173';
