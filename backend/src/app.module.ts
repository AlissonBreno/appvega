import { Module } from "@nestjs/common";
import { FoodModule } from "./food/food.module.js";
import { HealthModule } from "./health/health.module.js";
import { MealModule } from "./meal/meal.module.js";
import { UserModule } from "./user/user.module.js";

@Module({
  imports: [HealthModule, UserModule, FoodModule, MealModule],
})
export class AppModule {}
