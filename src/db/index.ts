import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  poolConnection: mysql.Pool | undefined;
};

const host = process.env.DB_HOST || "127.0.0.1";
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
const user = process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "123";
const database = process.env.DB_NAME || "bdaGroup";

export const poolConnection =
  globalForDb.poolConnection ||
  mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.poolConnection = poolConnection;
}

export const db = drizzle(poolConnection, { schema, mode: "default" });
export { schema };

export async function testDatabaseConnection() {
  try {
    const conn = await poolConnection.getConnection();
    conn.release();
    return true;
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string };
    console.error(`[DATABASE ERROR] Failed to connect to MySQL (${host}:${port}/${database}):`, err.message || error);
    return false;
  }
}
