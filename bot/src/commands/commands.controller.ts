import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from 'src/chat/chat.service';

import { CommandsService } from './commands.service';

interface ProcessCommandDto {
  roomId: number;
  messageId: number;
  text: string;
}

@Controller('commands')
export class CommandsController {
  constructor(
    private readonly commandsService: CommandsService,
    private readonly chatService: ChatService,
  ) {}

  @MessagePattern('processCommand')
  async processCommand({ roomId, text }: ProcessCommandDto) {
    const [command, ...args] = text.replace(/[^\w\s]/gi, '').split(' ');

    if (!this.commandsService[command]) {
      console.log('invalid command');
      return;
    }

    const result = this.commandsService[command](...args);

    this.chatService.sendMessage({ roomId, message: result.toString() });
  }
}
