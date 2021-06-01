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
          urls: ['amqp://localhost:5672'],
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
