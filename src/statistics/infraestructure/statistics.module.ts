import { Module } from '@nestjs/common';

import { StatisticsController } from './controllers/statistics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Terrarium, TerrariumSchema } from './adapters/schemas/TerrariumSchema';
import { MongoRepository } from './adapters/MongoRepository';
import {
  BarsService,
  LinealService,
  StatisticsService,
} from '../application/services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Terrarium.name, schema: TerrariumSchema },
    ]),
  ],
  controllers: [StatisticsController],
  providers: [MongoRepository, BarsService, LinealService, StatisticsService],
})
export class StatisticsModule {}
