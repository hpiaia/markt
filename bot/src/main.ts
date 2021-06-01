import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'commands_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  const logger = new Logger('NestFactory');

  app.listen(() => logger.log('Microservice is listening'));
}

bootstrap();
