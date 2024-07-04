import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [AddressService],
  controllers: [AddressController],
  exports: [AddressService]
})
export class AddressModule { }
