import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { getAverage, getOne, getPercentage } from '../utils';
import { DB_Repository } from 'src/statistics/domain/repositories/DB_Repository';
import { FormatI, LinealT } from 'src/statistics/domain/entities';
import { RpcException } from '@nestjs/microservices';
import { MongoRepository } from 'src/statistics/infraestructure/adapters/MongoRepository';

@Injectable()
export class LinealService {
  constructor(
    @Inject(MongoRepository) private readonly _dbRepository: DB_Repository,
  ) {}

  async execute(id: number): Promise<LinealT[]> {
    try {
      let results = [];

      for (let i = 9; i > 0; i--) {
        const today = new Date();

        const current = today.setDate(today.getDate() - i);
        const currentDate = new Date(current);

        // Obtenemos todos los registros del día basado en el id
        const documents: FormatI[] = await this._dbRepository.getData(
          id,
          currentDate,
        );

        // Encontramos el último registrado
        const closeDoc = getOne(documents, today);

        // Extraemos el objeto
        const { temperature, humidity, uv } = closeDoc;

        // Obtenemos ambos promedios
        const { avgTemperature, avgHumidity, avgUV } = getAverage(documents);

        // Obtenemos los procentajes
        const temperaturePercentage = getPercentage(
          temperature.t_max,
          temperature.t_min,
          avgTemperature,
        );
        const humidityPercentage = getPercentage(
          humidity.h_max,
          humidity.h_min,
          avgHumidity,
        );
        const uvPercentage = getPercentage(uv.uv_max, uv.uv_min, avgUV);

        // Agregamos el objeto al array
        results.push({
          date: currentDate.toISOString(),
          temperature: temperaturePercentage,
          humidity: humidityPercentage,
          uv: uvPercentage,
        });
      }

      return results;
    } catch (error: any) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
