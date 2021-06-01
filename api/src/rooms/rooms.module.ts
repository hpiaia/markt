import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  providers: [PrismaService, RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
