import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

   create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        profile: {
          create: { bio: 'New user' },
        },
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
    })
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } })
  }
}
