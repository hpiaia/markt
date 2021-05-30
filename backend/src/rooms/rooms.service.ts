import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async all() {
    return this.prisma.room.findMany({
      include: {
        owner: {
          select: { name: true, email: true },
        },
      },
    });
  }

  async findById(id: number) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        owner: {
          select: { name: true, email: true },
        },
      },
    });
  }

  async create(data: { name: string; description: string; ownerId: number }) {
    return this.prisma.room.create({
      data,
    });
  }

  async update(
    id: number,
    data: {
      name: string;
      description: string;
    },
  ) {
    return this.prisma.room.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.room.delete({
      where: { id },
    });
  }
}
