import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { User } from 'src/auth/user.decorator';

import { RoomsService } from '../rooms/rooms.service';
import { ParticipantsService } from './participants.service';

@Controller('participants')
export class ParticipantsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly participantsService: ParticipantsService,
  ) {}

  @Get('/:id')
  async index(@Param('id') roomId: string) {
    const room = await this.roomsService.findById(Number(roomId));

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    return this.participantsService.findAll({ roomId: Number(roomId) });
  }

  @Post('/:id')
  async create(@Param('id') roomId: string, @User() userId: number) {
    const room = await this.roomsService.findById(Number(roomId));

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    if (room.ownerId === userId) {
      throw new BadRequestException('you cannot join your own room');
    }

    if (
      await this.participantsService.findOne({
        roomId: Number(roomId),
        userId,
      })
    ) {
      throw new BadRequestException('you are already in this room');
    }

    return this.participantsService.create({
      roomId: Number(roomId),
      userId,
    });
  }

  @Delete('/:id')
  async delete(@Param('id') roomId: string, @User() userId: number) {
    const room = await this.roomsService.findById(Number(roomId));

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    if (
      !(await this.participantsService.findOne({
        roomId: Number(roomId),
        userId,
      }))
    ) {
      throw new BadRequestException('you are not in this room');
    }

    return this.participantsService.delete({
      roomId: Number(roomId),
      userId,
    });
  }
}
