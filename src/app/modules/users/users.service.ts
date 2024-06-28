import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/app/core/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      return this.prisma.user.create({
        data: {
          ...createUserDto,
          hashPassword: hashedPassword,
        },
      });

    } catch (error) {
      // if (error instanceof PrismaClient.PrismaClientKnownRequestError) {
      //   throw new BadRequestException(error.message);
      // }
      throw new InternalServerErrorException(error.message);
    }

  }

  async findByEmail(email: string) {
    try {
      return this.prisma.user.findUnique({
        where: { email },
      });

    } catch (error) {
      // if (error instanceof PrismaClient.PrismaClientKnownRequestError) {
      //   throw new BadRequestException(error.message);
      // }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return this.prisma.user.findMany();

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }
      return this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

    } catch (error) {
      // if (error instanceof PrismaClient.PrismaClientKnownRequestError) {
      //   throw new BadRequestException(error.message);
      // }
      throw new InternalServerErrorException(error.message);
    }
  }
}
