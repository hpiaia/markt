import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

interface ProcessCommand {
  roomId: number;
  messageId: number;
  command: string;
}

@Injectable()
export class CommandsService {
  private readonly logger = new Logger(CommandsService.name);

  constructor(
    @Inject('COMMANDS_SERVICE') private readonly client: ClientProxy,
  ) {}

  isCommand(text: string) {
    return /^\/(\w+)/.test(text);
  }

  processCommand(data: ProcessCommand) {
    this.logger.log(`Sending command "${data.command}" to commands processor`);

    this.client.emit('processCommand', data);
  }
}
