import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BarsService } from './bars.service';
import { LinealService } from './lineal.service';
import { RpcException } from '@nestjs/microservices';
import { GraphicI } from 'src/statistics/domain/entities';

@Injectable()
export class StatisticsService {
  constructor(
    @Inject(BarsService) private readonly _barsService: BarsService,
    @Inject(LinealService) private readonly _linealService: LinealService,
  ) {}
  async execute(id: number): Promise<GraphicI> {
    try {
      const lineal = await this._linealService.execute(id);
      const bars = await this._barsService.execute(id);

      return { lineal, bars };
    } catch (error: any) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
