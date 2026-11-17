import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module.js";
import { FoodController } from "./food.controller.js";
import { FoodRepository } from "./food.repository.js";
import { FoodService } from "./food.service.js";

@Module({
  imports: [DatabaseModule],
  controllers: [FoodController],
  providers: [FoodService, FoodRepository],
})
export class FoodModule {}
