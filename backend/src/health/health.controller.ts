import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { HealthService } from "./health.service.js";

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get("health")
  async show(): Promise<{ status: string }> {
    try {
      await this.healthService.ping();
      return { status: "ok" };
    } catch {
      throw new HttpException(
        { status: "unavailable" },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
