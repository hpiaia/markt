import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/jwt.guard';
import { User } from '../auth/user.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';

@UseGuards(JwtGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  /**
   * Returns all the available rooms.
   */
  @Get('/')
  async index() {
    return this.roomsService.all();
  }

  /**
   * Returns information about the room with a given id.
   */
  @Get('/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    const room = await this.roomsService.findOne({ id });

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    return room;
  }

  /**
   * Creates a new room.
   */
  @Post('/')
  async create(@Body() createRoomDto: CreateRoomDto, @User() userId: number) {
    return this.roomsService.create({
      ...createRoomDto,
      owner: { connect: { id: userId } },
    });
  }

  /**
   * Updates information from a room with a given id.
   */
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomDto: UpdateRoomDto,
    @User() userId: number,
  ) {
    const room = await this.roomsService.findOne({ id });

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    if (room.ownerId !== userId) {
      throw new UnauthorizedException('you are not the owner of this room');
    }

    return this.roomsService.update({ id }, updateRoomDto);
  }

  /**
   * Deletes a room with a given id.
   */
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number, @User() userId: number) {
    const room = await this.roomsService.findOne({ id });

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    if (room.ownerId !== userId) {
      throw new UnauthorizedException('you are not the owner of this room');
    }

    return this.roomsService.delete({ id });
  }
}
