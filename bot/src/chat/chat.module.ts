import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ChatService } from './chat.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'chat_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
