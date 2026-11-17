import { Controller } from "@nestjs/common";
import { MealService } from "./meal.service.js";

@Controller()
export class MealController {
  constructor(private readonly mealService: MealService) {}
}
