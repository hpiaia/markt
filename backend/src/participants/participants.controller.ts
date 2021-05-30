import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { User } from 'src/auth/user.decorator';

import { RoomsService } from '../rooms/rooms.service';
import { ParticipantsService } from './participants.service';

@Controller('participants')
@UseGuards(JwtGuard)
export class ParticipantsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly participantsService: ParticipantsService,
  ) {}

  /**
   * Inserts the signed user into a room.
   */
  @Post('/:id')
  async create(
    @Param('id', ParseIntPipe) roomId: number,
    @User() userId: number,
  ) {
    const room = await this.roomsService.find({ id: roomId });

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    if (room.ownerId === userId) {
      throw new BadRequestException('you cannot join your own room');
    }

    if (
      await this.participantsService.find({
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

  /**
   * Removes the signed user from a room.
   */
  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) roomId: number,
    @User() userId: number,
  ) {
    const room = await this.roomsService.find({ id: roomId });

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    if (
      !(await this.participantsService.find({
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
