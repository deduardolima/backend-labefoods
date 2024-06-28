import { UsersModule } from './app/modules/users/users.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule
  ],
  providers: [AppService],
})
export class AppModule { }
