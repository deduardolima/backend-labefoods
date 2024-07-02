import { CreateRestaurantDto, RestaurantResponseDto } from './dto/create-restaurant.dto';
import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ApiCommonResponses } from 'src/app/core/exceptions/api.execptions';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurants.service';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Criação de restaurantes', description: 'Enpoint para criar restaurante' })
  @ApiOkResponse({ description: 'Restaurante criado com sucesso', type: RestaurantResponseDto })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Buscar todos restaurantes', description: 'Enpoint para buscar restaurantes' })
  @ApiOkResponse({ description: 'Restaurantes encontrados com sucesso', type: RestaurantResponseDto })
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Buscar restaurante', description: 'Enpoint para buscar restaurante com ID' })
  @ApiOkResponse({ description: 'Restaurante encontrado com sucesso', type: RestaurantResponseDto })
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Patch(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Atualizar de endereço', description: 'Enpoint para atualizar restaurante' })
  @ApiOkResponse({ description: 'Restaurante atualizado com sucesso', type: RestaurantResponseDto })
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Remoção de restaurante', description: 'Enpoint para remover restaurante' })
  @ApiOkResponse({ description: 'Restaurante deletado com sucesso' })
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}
