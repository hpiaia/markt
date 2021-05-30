import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';

@Injectable()
export class ParticipantsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ roomId }: { roomId: number }) {
    return this.prisma.participant.findMany({
      where: {
        roomId,
      },
      select: {
        joinedAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne({ roomId, userId }: { roomId: number; userId: number }) {
    return this.prisma.participant.findUnique({
      where: {
        userId_roomId: {
          roomId,
          userId,
        },
      },
    });
  }

  async create({ roomId, userId }: { roomId: number; userId: number }) {
    return this.prisma.participant.create({
      data: {
        roomId,
        userId,
      },
    });
  }

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
