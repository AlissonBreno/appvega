import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";

@Injectable()
export class UserRepository {
  constructor(private readonly database: DatabaseService) {}
}
