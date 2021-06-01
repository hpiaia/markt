import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

interface SendMessage {
  roomId: number;
  text: string;
}

@Injectable()
export class ChatService {
  constructor(@Inject('CHAT_SERVICE') private readonly client: ClientProxy) {}

  sendMessage(data: SendMessage) {
    return this.client.emit('sendMessage', data);
  }
}
