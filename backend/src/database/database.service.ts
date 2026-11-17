import { Injectable, OnModuleDestroy } from "@nestjs/common";
import pg from "pg";

const { Pool } = pg;

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    connectionTimeoutMillis: 2000,
  });

  query(text: string, values: unknown[] = []): Promise<pg.QueryResult> {
    return this.pool.query(text, values);
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
