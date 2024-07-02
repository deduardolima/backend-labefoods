import { PrismaService } from 'src/app/core/prisma/prisma.service';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
  exports: [OrderService]
})
export class OrdersModule { }
