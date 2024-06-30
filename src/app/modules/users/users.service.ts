import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/app/core/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.findByEmail(createUserDto.email)
    if (existUser) {
      throw new BadRequestException('O endereço de e-mail já está em uso.');
    }
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const { password, ...userData } = createUserDto;

      return await this.prisma.user.create({
        data: {
          ...userData,
          hashPassword: hashedPassword,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002':
            throw new BadRequestException('O CPF já está em uso.');
        }
      }
      throw new InternalServerErrorException(e.message);
    }
  }

  async findByEmail(email: string) {
    try {
      return this.prisma.user.findUnique({
        where: { email },
      });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
