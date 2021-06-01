import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MessagesService } from '../messages/messages.service';
import { Message } from '.prisma/client';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Server;
  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly messagesService: MessagesService) {}

  afterInit() {
    this.logger.log('Chat gateway successfully started');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client with id ${client.id} has connected`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client with id ${client.id} has disconnected`);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, roomId: number) {
    this.logger.log(`Client with id ${client.id} joined room ${roomId}`);

    await client.join(`room-${roomId}`);

    const messages = await this.messagesService.fromRoom({
      roomId,
      take: 50,
    });

    return client.emit('messages', messages);
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket, roomId: number) {
    this.logger.log(`Client with id ${client.id} left room ${roomId}`);

    return client.leave(`room-${roomId}`);
  }

  async sendMessage(message: Message) {
    return this.server.to(`room-${message.roomId}`).emit('newMessage', message);
  }
}
