import { RestaurantsModule } from './app/modules/restaurants/restaurants.module';
import { ProductsModule } from './app/modules/products/products.module';
import { AddressModule } from './app/modules/address/address.module';
import { OrdersModule } from './app/modules/orders/orders.module';
import { UsersModule } from './app/modules/users/users.module';
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
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule { }
