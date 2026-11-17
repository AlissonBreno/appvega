import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import pg from "pg";

const { Pool } = pg;

const queryDatabase = async (): Promise<void> => {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    connectionTimeoutMillis: 2000,
  });

  try {
    await pool.query("SELECT 1");
  } finally {
    await pool.end();
  }
};

@Controller()
export class HealthController {
  @Get("health")
  async show(): Promise<{ status: string }> {
    try {
      await queryDatabase();
      return { status: "ok" };
    } catch {
      throw new HttpException(
        { status: "unavailable" },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
