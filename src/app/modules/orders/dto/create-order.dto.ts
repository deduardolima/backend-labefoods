import { RestaurantResponseDto } from '../../restaurants/dto/create-restaurant.dto';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { UserResponseDto } from '../../auth/users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'restaurantId é campo obrigatório' })
  restaurantId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'userId é campo obrigatório' })
  userId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'orderPrice é campo obrigatório' })
  orderPrice: number;
}



export class OrderResponseDto {
  @ApiProperty({ example: 'd25sa1d51sad51sa5d1sa5d1sa' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Pizzaria do Bairro' })
  @IsString()
  restaurantName: string;

  @ApiProperty({ example: '2023-06-30T16:30:00Z' })
  @IsDate()
  orderTime: Date;

  @ApiProperty({ example: '2023-06-30T17:00:00Z' })
  @IsDate()
  deliveryTime: Date;

  @ApiProperty({ example: 2100 })
  @IsNumber()
  orderPrice: number;

  @ApiProperty()
  @IsString()
  restaurantId: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ example: '2023-06-30T15:00:00Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2023-06-30T15:00:00Z' })
  @IsDate()
  updatedAt: Date;
}

export class OrderRelatedResponseDto extends OrderResponseDto {
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @ApiProperty({ type: RestaurantResponseDto })
  restaurant: RestaurantResponseDto;

}
