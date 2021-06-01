import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/jwt.guard';
import { User } from '../auth/user.decorator';
import { CommandsService } from '../commands/commands.service';
import { RoomsService } from '../rooms/rooms.service';
import { SendMessageDto } from './dto/send-message.dto';
import { MessagesService } from './messages.service';

@UseGuards(JwtGuard)
@Controller('rooms/:roomId/messages')
export class MessagesController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly messagesService: MessagesService,
    private readonly commandsService: CommandsService,
  ) {}

  /**
   * Get first messages from a room.
   */
  @Get()
  async index(@Param('roomId', ParseIntPipe) roomId: number) {
    const room = await this.roomsService.findOne({ id: roomId });

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    return this.messagesService.fromRoom(roomId);
  }

  /**
   * Send a new message to a room.
   */
  @Post()
  async send(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() { text }: SendMessageDto,
    @User() userId: number,
  ) {
    const room = await this.roomsService.findOne({ id: roomId });

    if (!room) {
      throw new BadRequestException('there is no room with this id');
    }

    const message = await this.messagesService.create({
      text,
      user: { connect: { id: userId } },
      room: { connect: { id: roomId } },
    });

    if (this.commandsService.isCommand(text)) {
      this.commandsService.processCommand({
        roomId,
        messageId: message.id,
        text,
      });
    }

    return message;
  }
}
