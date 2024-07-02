import { PrismaService } from 'src/app/core/prisma/prisma.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ProductsService, PrismaService],
  controllers: [ProductsController],
  exports: [ProductsService]
})
export class ProductsModule { }
