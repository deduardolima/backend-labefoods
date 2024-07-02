import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderResponseDto } from './dto/create-order.dto';
import { PrismaService } from 'src/app/core/prisma/prisma.service';
import { Order, Prisma, Restaurant, User } from '@prisma/client';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductResponseDto } from '../products/dto/create-product.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, restaurantId, orderPrice } = createOrderDto;
    try {
      return this.prisma.$transaction(async (prisma) => {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        const restaurant = await prisma.restaurant.findUnique({ where: { id: restaurantId } });
        if (!restaurant) {
          throw new NotFoundException('Restaurant not found');
        }

        const orderTime = new Date();
        const deliveryTime = new Date(orderTime.getTime() + restaurant.deliveryTime * 60000);

        return prisma.order.create({
          data: {
            restaurantName: restaurant.name,
            orderTime,
            deliveryTime,
            orderPrice,
            restaurantId,
            userId,
          },
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    };
  };
  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { userId, restaurantId } = updateOrderDto;
    try {
      return this.prisma.$transaction(async (prisma) => {
        // Verificar se o pedido existe
        const order = await prisma.order.findUnique({ where: { id } });
        if (!order) {
          throw new NotFoundException('Order not found');
        }

        // Verificar se o usuário existe
        if (userId) {
          const user = await prisma.user.findUnique({ where: { id: userId } });
          if (!user) {
            throw new NotFoundException('User not found');
          }
        }
        // Verificar se o restaurante existe
        if (restaurantId) {
          const restaurant = await prisma.restaurant.findUnique({ where: { id: restaurantId } });
          if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
          }
        }

        return prisma.order.update({
          where: { id },
          data: updateOrderDto,
        });
      });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  };
  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.prisma.order.findMany({
        include: {
          user: true,
          restaurant: {
            include: {
              products: true,
            },
          },
        },
      });
      return orders.map(this.toOrderResponseDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };
  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
        include: {
          user: true,
          restaurant: {
            include: {
              products: true,
            },
          },
        },
      });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return this.toOrderResponseDto(order);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      };
      throw new InternalServerErrorException(error.message);
    }
  };
  async remove(id: string): Promise<Order> {
    try {
      return this.prisma.order.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  };

  private toOrderResponseDto(order: Order & { user: User; restaurant: Restaurant & { products: ProductResponseDto[] } }): OrderResponseDto {
    return {
      id: order.id,
      restaurantName: order.restaurantName,
      orderTime: order.orderTime,
      deliveryTime: order.deliveryTime,
      orderPrice: order.orderPrice,
      restaurantId: order.restaurantId,
      userId: order.userId,
      restaurant: {
        id: order.restaurant.id,
        name: order.restaurant.name,
        logoUrl: order.restaurant.logoUrl,
        address: order.restaurant.address,
        description: order.restaurant.description,
        category: order.restaurant.category,
        deliveryTime: order.restaurant.deliveryTime,
        deliveryFee: order.restaurant.deliveryFee,
        products: order.restaurant.products.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          photoUrl: product.photoUrl,
          description: product.description,
          category: product.category,
          restaurantId: product.restaurantId,
        })),

      },
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
        cpf: order.user.cpf,
      },
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
