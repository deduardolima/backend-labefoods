import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiCommonResponses } from 'src/app/core/exceptions/api.execptions';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Criação de usuário', description: 'Enpoint para criar de usuário' })
  @ApiOkResponse({ description: 'Usuário criado com sucesso', type: UserResponseDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Busca de usuário', description: 'Enpoint para buscar usuário' })
  @ApiOkResponse({ description: 'Usuário encontrado com sucesso', type: UserResponseDto })
  async findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Atualizar usuário', description: 'Enpoint para atualizar usuário' })
  @ApiOkResponse({ description: 'Atualizado com sucesso', type: UserResponseDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
