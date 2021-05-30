import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';

@Injectable()
export class ParticipantsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Finds user within a room.
   */
  async find({ roomId, userId }: { roomId: number; userId: number }) {
    return this.prisma.participant.findUnique({
      where: {
        userId_roomId: {
          roomId,
          userId,
        },
      },
    });
  }

  /**
   * Insert a user into a room.
   */
  async create({ roomId, userId }: { roomId: number; userId: number }) {
    return this.prisma.participant.create({
      data: {
        roomId,
        userId,
      },
    });
  }

  /**
   * Removes a user from a room.
   */
  async delete({ roomId, userId }: { roomId: number; userId: number }) {
    return this.prisma.participant.delete({
      where: {
        userId_roomId: {
          roomId,
          userId,
        },
      },
    });
  }
}
