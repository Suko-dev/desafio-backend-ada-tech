import dotenv from 'dotenv';
import path from 'path';

const ENVIRONMENT = process.env.NODE_ENV || 'local';

dotenv.config({ path: path.resolve(__dirname, `../../.env.${ENVIRONMENT}`) });

// Servidor
const PORT = Number(process.env.PORT);

// Authentication
const SECRET = process.env.JWT_SECRET!;
const EXPIRATION = Number(process.env.JWT_EXPIRATION);
const LOGIN = process.env.LOGIN!;
const PASSWORD = process.env.PASSWORD!;

// Database
const DATABASE_CONNECTION = process.env.DATABASE_CONNECTION!;

/** clustering by context **/
const SERVER = {
  PORT,
};

const AUTHENTICATION = {
  JWT: {
    SECRET,
    EXPIRATION,
  },
  LOGIN,
  PASSWORD,
};

export const config = { SERVER, AUTHENTICATION, ENVIRONMENT, DATABASE_CONNECTION };
