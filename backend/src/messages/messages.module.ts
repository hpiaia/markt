import { Module } from '@nestjs/common';
import { CommandsModule } from 'src/commands/commands.module';
import { RoomsModule } from 'src/rooms/rooms.module';

import { PrismaService } from '../app/prisma.service';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [RoomsModule, CommandsModule],
  providers: [PrismaService, MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
