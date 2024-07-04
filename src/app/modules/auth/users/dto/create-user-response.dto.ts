import { IsString } from 'class-validator';
import { UserResponseDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserResponseDto extends UserResponseDto {
  @ApiProperty({ example: 'IOFDNJpaofiunsjfnpsaofnsalfknsaçlfnaçsl' })
  @IsString()
  access_token: string;
}

