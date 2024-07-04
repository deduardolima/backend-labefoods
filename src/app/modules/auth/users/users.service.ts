import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserRelatedResponseDto } from './dto/create-user.dto';
import { PrismaService } from 'src/app/core/prisma/prisma.service';
import { Address, Order, Prisma, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<{ user: User, token: string }> {
    const existUser = await this.findByEmail(createUserDto.email);
    if (existUser) {
      throw new BadRequestException('O endereço de e-mail já está em uso.');
    }

    try {
      return await this.prisma.$transaction(async (prisma) => {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const { password, ...userData } = createUserDto;

        const user = await prisma.user.create({
          data: {
            ...userData,
            hashPassword: hashedPassword,
          },
        });

        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);

        return { user, token };
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException('O CPF já está em uso.');
        }
      }
      throw new InternalServerErrorException(e.message);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);

    }
  }
  async findAll(): Promise<User[]> {
    try {
      return this.prisma.user.findMany();

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async findOne(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          addresses: true,
          orders: true
        }
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return this.toUserResponseDto(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
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
  private toUserResponseDto(user: User & { orders: Order[]; addresses: Address[] }): UserRelatedResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      hashPassword: user.hashPassword,
      addresses: user.addresses.map(address => ({
        id: address.id,
        cep: address.cep,
        street: address.street,
        number: address.number,
        district: address.district,
        city: address.city,
        state: address.state,
        complement: address.complement,
        userId: address.userId,
      })),
      orders: user.orders.map(order => ({
        id: order.id,
        restaurantName: order.restaurantName,
        orderTime: order.orderTime,
        deliveryTime: order.deliveryTime,
        orderPrice: order.orderPrice,
        restaurantId: order.restaurantId,
      })),
    };
  }
}
