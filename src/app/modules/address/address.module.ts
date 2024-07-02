import { PrismaService } from 'src/app/core/prisma/prisma.service';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [AddressService, PrismaService],
  controllers: [AddressController],
  exports: [AddressService]
})
export class AddressModule { }
