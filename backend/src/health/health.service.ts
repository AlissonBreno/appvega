import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";

@Injectable()
export class HealthService {
  constructor(private readonly database: DatabaseService) {}

  async ping(): Promise<void> {
    await this.database.query("SELECT 1");
  }
}
