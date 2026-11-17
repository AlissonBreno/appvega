import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";

@Injectable()
export class MealRepository {
  constructor(private readonly database: DatabaseService) {}
}
