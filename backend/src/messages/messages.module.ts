import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { RoomsModule } from '../rooms/rooms.module';
import { MessagesService } from './messages.service';

@Module({
  imports: [RoomsModule],
  providers: [PrismaService, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
