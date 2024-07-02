import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'name é campo obrigatório' })
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'price é campo obrigatório' })
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'photoUrl é campo obrigatório' })
  photoUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'description é campo obrigatório' })
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'category é campo obrigatório' })
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'restaurantId é campo obrigatório' })
  restaurantId: string;
}

export class ProductResponseDto {
  @ApiProperty({ example: 'd25sa1d51sad51sa5d1sa5d1sa' })
  id: string;

  @ApiProperty({ example: 'Sorvete' })
  name: string;

  @ApiProperty({ example: '15.50' })
  price: number;

  @ApiProperty({ example: 'Phttps://example.com/photo' })
  photoUrl: string;

  @ApiProperty({ example: 'Exemplo de descrição' })
  description: string;

  @ApiProperty({ example: 'sobremessa' })
  category: string;

  @ApiProperty({ example: 'Pizzaria' })
  restaurantId: string;
}