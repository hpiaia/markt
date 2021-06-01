import { Module } from '@nestjs/common';
import { CommandsModule } from 'src/commands/commands.module';

import { MessagesModule } from '../messages/messages.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [MessagesModule, CommandsModule],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
