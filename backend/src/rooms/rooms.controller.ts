import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/auth/user.decorator';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('/')
  async index() {
    return this.roomsService.all();
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    return this.roomsService.findById(Number(id));
  }

  @Post('/')
  async create(@Body() roomData: CreateRoomDto, @User() userId: number) {
    return this.roomsService.create({ ...roomData, ownerId: userId });
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @User() userId: number,
    @Body() roomData: UpdateRoomDto,
  ) {
    const room = await this.roomsService.findById(Number(id));

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    if (room.ownerId !== userId) {
      throw new UnauthorizedException();
    }

    return this.roomsService.update(Number(id), roomData);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @User() userId: number) {
    const room = await this.roomsService.findById(Number(id));

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    if (room.ownerId !== userId) {
      throw new UnauthorizedException();
    }

    return this.roomsService.delete(Number(id));
  }
}
