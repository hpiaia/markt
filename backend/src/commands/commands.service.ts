import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CommandsService {
  constructor(
    @Inject('COMMANDS_SERVICE') private readonly client: ClientProxy,
  ) {}

  isCommand(text: string) {
    return text.startsWith('/');
  }

  processCommand(data: { roomId: number; messageId: number; text: string }) {
    return this.client.emit('processCommand', data);
  }
}
