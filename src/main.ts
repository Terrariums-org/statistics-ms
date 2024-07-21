import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { configService } from './shared/dto';
import { STATISTICS_QUEUE } from './shared/constants';

async function bootstrap() {
  const logger = new Logger('Main-statistics');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: configService.get('BROKER_HOST'),
        queue: STATISTICS_QUEUE.statisticsQueue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen();
  logger.log('Statistics microservice started');
}
bootstrap();
