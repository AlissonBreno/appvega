import { Injectable } from "@nestjs/common";
import { FoodRepository } from "./food.repository.js";

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}
}
