import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProductDto, ProductResponseDto } from './dto/create-product.dto';
import { ApiCommonResponses } from 'src/app/core/exceptions/api.execptions';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) { }

  @Post()
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Criação de produtos', description: 'Enpoint para criar produtos ' })
  @ApiOkResponse({ description: 'Produto criado com sucesso', type: ProductResponseDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Busca de produtos ', description: 'Enpoint para criar produtos ' })
  @ApiOkResponse({ description: 'Produto encontrado com sucesso', type: ProductResponseDto })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Busca de produtos s', description: 'Enpoint para busca de produtos com ID ' })
  @ApiOkResponse({ description: 'Produto encontrado com sucesso', type: ProductResponseDto })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Atualização de produtos s', description: 'Enpoint para atualização de produtos ' })
  @ApiOkResponse({ description: 'Produto atualizado com sucesso', type: ProductResponseDto })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Remoção de produtos', description: 'Enpoint para deletar produtos ' })
  @ApiOkResponse({ description: 'Produto deletado com sucesso' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
