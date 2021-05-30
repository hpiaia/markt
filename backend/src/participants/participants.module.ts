import { Module } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
import { RoomsModule } from 'src/rooms/rooms.module';

import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';

@Module({
  imports: [RoomsModule],
  providers: [PrismaService, ParticipantsService],
  controllers: [ParticipantsController],
})
export class ParticipantsModule {}
