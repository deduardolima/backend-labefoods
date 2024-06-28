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

