import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/app/core/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address, Prisma } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) { }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      return this.prisma.address.create({
        data: createAddressDto,
      });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    try {
      return this.prisma.address.update({
        where: { id },
        data: updateAddressDto,
      });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Address[]> {
    try {
      return this.prisma.address.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<Address> {
    try {
      return this.prisma.address.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<Address> {
    try {
      return this.prisma.address.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
