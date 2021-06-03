import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from 'src/chat/chat.service';

import { CommandsService } from './commands.service';

interface ProcessCommand {
  roomId: number;
  messageId: number;
  command: string;
}

@Controller('commands')
export class CommandsController {
  private readonly logger = new Logger(CommandsController.name);

  constructor(
    private readonly commandsService: CommandsService,
    private readonly chatService: ChatService,
  ) {}

  @MessagePattern('processCommand')
  async processCommand({ roomId, command }: ProcessCommand) {
    const [name, ...args] = this.parseCommandText(command);

    if (!this.commandsService[name]) {
      const validCommands = this.getValidCommands().join(', ');

      return this.chatService.sendMessage({
        roomId,
        text: `The command you typed do not exist, please use a valid one (${validCommands}).`,
      });
    }

    try {
      const result = (await this.commandsService[name](...args)).toString();

      if (result) {
        return this.chatService.sendMessage({ roomId, text: result });
      }
    } catch (e) {
      this.logger.error('An error occurred while processing a command', e);

      return this.chatService.sendMessage({
        roomId,
        text: 'Something wrong happened when processing your command, please try again.',
      });
    }
  }

  private parseCommandText(command: string) {
    return command
      .substring(1)
      .replace(/=/g, ' ')
      .split(' ')
      .filter((item) => item !== '');
  }

  private getValidCommands() {
    return Object.getOwnPropertyNames(CommandsService.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => `/${name}`);
  }
}
