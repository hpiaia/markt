import { Injectable } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { Message, Prisma } from '.prisma/client';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Returns first 50 messages from the room with a given id.
   */
  async fromRoom(roomId: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        roomId,
      },
      take: 50,
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Creates a message in the database.
   */
  async create(data: Prisma.MessageCreateInput): Promise<Message> {
    return this.prisma.message.create({
      data,
    });
  }
}
