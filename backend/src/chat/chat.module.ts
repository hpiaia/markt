import { Module } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';

import { MessagesModule } from '../messages/messages.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [MessagesModule],
  providers: [PrismaService, ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
