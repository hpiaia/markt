import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { CommandsService } from './commands.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMANDS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'commands_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [CommandsService],
  exports: [CommandsService],
})
export class CommandsModule {}
