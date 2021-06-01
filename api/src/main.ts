import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { SocketIoAdapter } from './app/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'chat_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.useWebSocketAdapter(new SocketIoAdapter(app, true));

  await app.startAllMicroservicesAsync();
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
