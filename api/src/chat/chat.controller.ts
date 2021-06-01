import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtGuard } from 'src/auth/jwt.guard';
import { User } from 'src/auth/user.decorator';
import { CommandsService } from 'src/commands/commands.service';

import { MessagesService } from '../messages/messages.service';
import { ChatGateway } from './chat.gateway';

interface SendMessage {
  roomId: number;
  text: string;
}

@Controller('chat')
export class ChatController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly chatGateway: ChatGateway,
    private readonly commandsService: CommandsService,
  ) {}

  @MessagePattern('sendMessage')
  async sendMessageFromBot({ roomId, text }: SendMessage) {
    const message = await this.messagesService.create({
      text,
      room: {
        connect: {
          id: roomId,
        },
      },
    });

    await this.chatGateway.sendMessage(message);
  }

  @UseGuards(JwtGuard)
  @Post('send-message')
  async sendMessage(
    @Body() { roomId, text }: SendMessage,
    @User() userId: number,
  ) {
    const message = await this.messagesService.create({
      text,
      user: {
        connect: {
          id: userId,
        },
      },
      room: {
        connect: {
          id: roomId,
        },
      },
    });

    if (this.commandsService.isCommand(text)) {
      this.commandsService.processCommand({
        roomId,
        messageId: message.id,
        command: text,
      });
    }

    this.chatGateway.sendMessage(message);

    return message;
  }
}
