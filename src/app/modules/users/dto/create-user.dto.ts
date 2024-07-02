import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
  email: string;

  @ApiProperty({ example: '12345678900' })
  @IsString()
  cpf: string;
}
