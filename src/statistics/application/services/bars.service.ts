import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { getOne } from '../utils';
import { FormatI, BarsT } from 'src/statistics/domain/entities';
import { MongoRepository } from 'src/statistics/infraestructure/adapters/MongoRepository';
import { DB_Repository } from 'src/statistics/domain/repositories/DB_Repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BarsService {
  constructor(
    @Inject(MongoRepository) private readonly _dbRepository: DB_Repository,
  ) {}

  async execute(id: number): Promise<BarsT[]> {
    try {
      const today = new Date();

      const documents: FormatI[] = await this._dbRepository.getData(id, today);

      const closeDoc: FormatI = getOne(documents, today);

      const { soil } = closeDoc;

      return [
        {
          name: 'Potasio',
          level: soil.potassium,
        },
        {
          name: 'Fósforo',
          level: soil.phosphorous,
        },
        {
          name: 'Nitrógeno',
          level: soil.nitrogen,
        },
      ];
    } catch (error: any) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
