import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { CommandsModule } from '../commands/commands.module';
import { RoomsModule } from '../rooms/rooms.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [RoomsModule, CommandsModule],
  providers: [PrismaService, MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
