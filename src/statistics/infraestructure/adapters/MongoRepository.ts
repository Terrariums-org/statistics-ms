import { HttpStatus, Injectable } from '@nestjs/common';
import { FormatI } from '../../domain/entities';
import { DB_Repository } from '../../domain/repositories/DB_Repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Terrarium } from './schemas';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MongoRepository implements DB_Repository {
  constructor(
    @InjectModel(Terrarium.name)
    private readonly _TerrariumModel: Model<Terrarium>,
  ) {}
  async getData(id: number, date: Date): Promise<FormatI[]> {
    try {
      const data: FormatI[] = await this._TerrariumModel.find({
        id: id,
        date: {
          $regex: `^${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}`,
        },
      });
      return data;
    } catch (error: any) {
      console.error('Error fetching data:', error);
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
