import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChatService {
  constructor(@Inject('CHAT_SERVICE') private readonly client: ClientProxy) {}

  sendMessage(data: { roomId: number; message: string }) {
    return this.client.emit('sendMessage', data);
  }
}
