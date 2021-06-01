import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { MessagesService } from '../messages/messages.service';

interface SendMessageDto {
  roomId: number;
  message: string;
}

@Controller('chat')
export class ChatController {
  constructor(private readonly messagesService: MessagesService) {}

  @MessagePattern('sendMessage')
  async sendMessage({ roomId, message }: SendMessageDto) {
    await this.messagesService.create({
      text: message,
      room: {
        connect: {
          id: roomId,
        },
      },
    });
  }
}
