import { Injectable } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { Message, Prisma } from '.prisma/client';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Returns first messages from the room with a given id.
   */
  async fromRoom({
    roomId,
    take,
  }: {
    roomId: number;
    take: number;
  }): Promise<Message[]> {
    return (
      await this.prisma.message.findMany({
        where: {
          roomId,
        },
        take,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      })
    ).reverse();
  }

  /**
   * Creates a message in the database.
   */
  async create(data: Prisma.MessageCreateInput): Promise<Message> {
    return this.prisma.message.create({
      data,
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
}
