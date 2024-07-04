import { RestaurantController } from './restaurants.controller';
import { RestaurantService } from './restaurants.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService]
})
export class RestaurantsModule { }
