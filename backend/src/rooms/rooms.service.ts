import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';

import { Prisma } from '.prisma/client';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all the rooms.
   */
  async all() {
    return this.prisma.room.findMany({
      include: {
        owner: {
          select: { name: true, email: true },
        },
      },
    });
  }

  /**
   * Finds a room with a given id.
   */
  async find(where: Prisma.RoomWhereUniqueInput) {
    return this.prisma.room.findUnique({
      where,
      include: {
        owner: {
          select: { name: true, email: true },
        },
      },
    });
  }

  /**
   * Creates a room.
   */
  async create(data: Prisma.RoomCreateInput) {
    return this.prisma.room.create({
      data,
    });
  }

  /**
   * Updates a room with a given id.
   */
  async update(
    where: Prisma.RoomWhereUniqueInput,
    data: Prisma.RoomUpdateInput,
  ) {
    return this.prisma.room.update({
      where,
      data,
    });
  }

  /**
   * Deletes a room with a given id.
   */
  async delete(where: Prisma.RoomWhereUniqueInput) {
    return this.prisma.room.delete({
      where,
    });
  }
}
