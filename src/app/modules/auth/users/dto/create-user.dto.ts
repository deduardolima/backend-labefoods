import { AddressResponseDto } from 'src/app/modules/address/dto/create-address.dto';
import { IsArray, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Nome é campo obrigatório' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email é campo obrigatório' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Senha é campo obrigatório' })
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'CPF é campo obrigatório' })
  @IsString()
  cpf: string;
}


export class UserResponseDto {
  @ApiProperty({ example: 'd25sa1d51sad51sa5d1sa5d1sa' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'joao.silva@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678900' })
  @IsString()
  cpf: string;

  @ApiProperty({ example: '$2a$10$dT1zpg05JPNfYcRx2uogtOcIH7QBWzlgGDWHbW7t0ABzzWMf' })
  @IsString()
  hashPassword: string;
}

class Order {
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

  @ApiProperty({ example: 21.00 })
  @IsNumber()
  orderPrice: number;

  @ApiProperty()
  @IsString()
  restaurantId: string;
}

export class UserRelatedResponseDto extends UserResponseDto {
  @ApiProperty({ type: [AddressResponseDto] })
  @IsArray()
  addresses: AddressResponseDto[];

  @ApiProperty({ type: [Order] })
  @IsArray()
  orders: Order[];


}

