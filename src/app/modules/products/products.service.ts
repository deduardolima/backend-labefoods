import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/app/core/prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return this.prisma.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return this.prisma.product.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  async findOne(id: string): Promise<Product> {
    try {
      return this.prisma.product.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  };

  async update(id: string, updateRestaurantDto: UpdateProductDto): Promise<Product> {
    try {
      return this.prisma.product.update({
        where: { id },
        data: updateRestaurantDto,
      });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  };

  async remove(id: string): Promise<Product> {
    try {
      return this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  };
}
