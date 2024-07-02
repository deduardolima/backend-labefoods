import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber, IsNotEmpty, IsArray } from 'class-validator';
import { ProductResponseDto } from '../../products/dto/create-product.dto';

export class CreateRestaurantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'logoUrl é campo obrigatório' })
  logoUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'address é campo obrigatório' })
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'name é campo obrigatório' })
  name: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty({ message: 'deliveryTime é campo obrigatório' })
  deliveryTime: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'description é campo obrigatório' })
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'category é campo obrigatório' })
  category: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'deliveryFee é campo obrigatório' })
  deliveryFee: number;
}


export class RestaurantResponseDto {
  @ApiProperty({ example: 'd25sa1d51sad51sa5d1sa5d1sa' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Pizzaria do Bairro' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/logo.png' })
  @IsString()
  logoUrl: string;

  @ApiProperty({ example: 'Rua Exemplo, 123' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Pizzas deliciosas' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'pizza' })
  @IsString()
  category: string;

  @ApiProperty({ example: 30 })
  @IsNumber()
  deliveryTime: number;

  @ApiProperty({ example: 5.00 })
  @IsNumber()
  deliveryFee: number;

  @ApiProperty({ type: [ProductResponseDto] })
  @IsArray()
  products: ProductResponseDto[];
}
