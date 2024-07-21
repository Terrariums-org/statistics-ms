import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { STATISTICS_QUEUE } from 'src/shared/constants';
import { StatisticsService } from 'src/statistics/application/services/statistics.service';

@Controller()
export class StatisticsController {
  constructor(
    @Inject(StatisticsService)
    private readonly statisticsService: StatisticsService,
  ) {}

  @MessagePattern({ cmd: STATISTICS_QUEUE.getStatistics })
  async getStatistics(@Payload() idTerrarium: number) {
    return this.statisticsService.execute(idTerrarium);
  }
}
