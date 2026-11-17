import { Controller } from "@nestjs/common";
import { FoodService } from "./food.service.js";

@Controller()
export class FoodController {
  constructor(private readonly foodService: FoodService) {}
}
