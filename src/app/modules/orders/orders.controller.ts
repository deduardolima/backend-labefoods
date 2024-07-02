import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ApiCommonResponses } from 'src/app/core/exceptions/api.execptions';
import { CreateOrderDto, OrderResponseDto } from './dto/create-order.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Criação de Ordens', description: 'Enpoint para criar ordens' })
  @ApiOkResponse({ description: 'Ordem criada com sucesso', type: OrderResponseDto })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Buscar todas as Ordens', description: 'Enpoint para buscar ordens' })
  @ApiOkResponse({ description: 'Ordem encontrada com sucesso', type: [OrderResponseDto] })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Busca de Ordens', description: 'Enpoint para buscar ordens com ID' })
  @ApiOkResponse({ description: 'Ordem encontrada com sucesso', type: OrderResponseDto })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Atualizar Ordens', description: 'Enpoint para atualizar ordens' })
  @ApiOkResponse({ description: 'Ordem atualizada com sucesso', type: OrderResponseDto })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Remover Ordens', description: 'Enpoint para deletar ordens' })
  @ApiOkResponse({ description: 'Ordem deletada com sucesso' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
