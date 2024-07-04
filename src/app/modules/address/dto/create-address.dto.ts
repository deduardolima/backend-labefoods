import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'CEP é campo obrigatório' })
  cep: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Street é campo obrigatório' })
  street: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Number é campo obrigatório' })
  number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'District é campo obrigatório' })
  district: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'City é campo obrigatório' })
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'State é campo obrigatório' })
  state: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  complement?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'UserID é campo obrigatório' })
  @IsString()
  userId: string;
}


export class AddressResponseDto {
  @ApiProperty({ example: 'd25sa1d51sad51sa5d1sa5d1sa' })
  @IsString()
  id: string;
  @ApiProperty({ example: '01310-930' })
  @IsString()
  cep: string;

  @ApiProperty({ example: 'Av. Paulista' })
  @IsString()
  street: string;

  @ApiProperty({ example: '2100' })
  @IsString()
  number: string;

  @ApiProperty({ example: 'Bela Vista' })
  @IsString()
  district: string;

  @ApiProperty({ example: 'São Paulo', })
  @IsString()
  city: string

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'apto 305' })
  @IsString()
  complement?: string;

  @ApiProperty({ example: '1sa25d1sa2-da36-4e08-866e-94701efe7192', })
  @IsString()
  userId: string;
}