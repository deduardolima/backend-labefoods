import { RestaurantsModule } from './app/modules/restaurants/restaurants.module';
import { ProductsModule } from './app/modules/products/products.module';
import { AddressModule } from './app/modules/address/address.module';
import { OrdersModule } from './app/modules/orders/orders.module';
import { PrismaModule } from './app/core/prisma/prisma.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RestaurantsModule,
    ProductsModule,
    AddressModule,
    OrdersModule,
    PrismaModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule { }
