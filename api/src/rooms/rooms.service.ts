import { Injectable } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { Prisma } from '.prisma/client';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all rooms owned by the given user id.
   */
  async all() {
    return this.prisma.room.findMany({
      include: {
        ...this.includeOwner(),
      },
    });
  }

  /**
   * Finds a room with a given id.
   */
  async findOne(where: Prisma.RoomWhereUniqueInput) {
    return this.prisma.room.findUnique({
      where,
      include: {
        ...this.includeOwner(),
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

  /**
   * Includes the room owner in a query.
   */
  private includeOwner(): Prisma.RoomInclude {
    return {
      owner: {
        select: {
          name: true,
          email: true,
        },
      },
    };
  }
}
