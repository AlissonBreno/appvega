import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";

@Injectable()
export class FoodRepository {
  constructor(private readonly database: DatabaseService) {}
}
