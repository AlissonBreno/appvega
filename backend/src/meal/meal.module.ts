import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module.js";
import { MealController } from "./meal.controller.js";
import { MealRepository } from "./meal.repository.js";
import { MealService } from "./meal.service.js";

@Module({
  imports: [DatabaseModule],
  controllers: [MealController],
  providers: [MealService, MealRepository],
})
export class MealModule {}
