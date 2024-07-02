import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressResponseDto, CreateAddressDto } from './dto/create-address.dto';
import { ApiCommonResponses } from 'src/app/core/exceptions/api.execptions';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressService } from './address.service';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Criação de endereço', description: 'Enpoint para criar endereço do usuário' })
  @ApiOkResponse({ description: 'Endereço criado com sucesso', type: AddressResponseDto })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Buscar todos endereços', description: 'Enpoint para todos endereços' })
  @ApiOkResponse({ description: '', type: [AddressResponseDto] })
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Buscar endereço com ID', description: 'Enpoint para endereço com ID como parametro' })
  @ApiOkResponse({ description: 'Endereço encontrado', type: AddressResponseDto })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Atualizar endereço cadastrado', description: 'Enpoint para atualizar endereço cadastrado' })
  @ApiOkResponse({ description: 'Endereço atualizados com sucesso', type: AddressResponseDto })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Buscar todos endereços', description: 'Enpoint para todos endereços' })
  @ApiOkResponse({ description: 'Deletado com sucesso' })
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}