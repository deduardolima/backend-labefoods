import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/app/core/prisma/prisma.service';
import { CreateRestaurantDto, RestaurantResponseDto } from './dto/create-restaurant.dto';
import { Prisma, Restaurant } from '@prisma/client';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ProductResponseDto } from '../products/dto/create-product.dto';


@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) { }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    try {
      return this.prisma.restaurant.create({
        data: createRestaurantDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    try {
      return this.prisma.restaurant.update({
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

  async findAll(): Promise<RestaurantResponseDto[]> {
    try {
      const restaurants = await this.prisma.restaurant.findMany({
        include: {
          products: true
        }
      });
      return restaurants.map(this.toRestaurantResponseDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  async findOne(id: string): Promise<RestaurantResponseDto> {
    try {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id },
        include: {
          products: true
        }
      });
      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      return this.toRestaurantResponseDto(restaurant);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  };

  async remove(id: string): Promise<Restaurant> {
    try {
      return this.prisma.restaurant.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  };

  private toRestaurantResponseDto(restaurant: Restaurant & { products: ProductResponseDto[] }): RestaurantResponseDto {
    return {
      id: restaurant.id,
      logoUrl: restaurant.logoUrl,
      address: restaurant.address,
      name: restaurant.name,
      deliveryTime: restaurant.deliveryTime,
      description: restaurant.description,
      category: restaurant.category,
      deliveryFee: restaurant.deliveryFee,
      products: restaurant.products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        photoUrl: product.photoUrl,
        description: product.description,
        category: product.category,
        restaurantId: product.restaurantId,
      })),
    };
  }
}
