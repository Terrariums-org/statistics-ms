import { Module } from '@nestjs/common';
import { StatisticsModule } from './statistics/infraestructure/statistics.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configService } from './shared/dto';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.production.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(configService.get('MONGO_URL')),
    StatisticsModule,
  ],
})
export class AppModule {}
