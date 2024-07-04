import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrdersModule { }
