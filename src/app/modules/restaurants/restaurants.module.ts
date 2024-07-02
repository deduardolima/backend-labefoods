import { PrismaService } from 'src/app/core/prisma/prisma.service';
import { RestaurantController } from './restaurants.controller';
import { RestaurantService } from './restaurants.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService, PrismaService],
  exports: [RestaurantService]
})
export class RestaurantsModule { }
