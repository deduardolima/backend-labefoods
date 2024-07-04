import { ApiCommonResponses } from "src/app/core/exceptions/api.execptions";
import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserResponseDto } from "./dto/create-user-response.dto";
import { CreateUserDto, UserRelatedResponseDto, UserResponseDto } from "./dto/create-user.dto";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post('signup')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Criação de usuário', description: 'Enpoint para criar de usuário' })
  @ApiOkResponse({ description: 'Usuário criado com sucesso', type: CreateUserResponseDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const { user, token } = await this.usersService.create(createUserDto);
    return { access_token: token, ...user };
  }

  @Get()
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Busca de usuário', description: 'Enpoint para buscar usuário' })
  @ApiOkResponse({ description: 'Usuário encontrado com sucesso', type: [UserResponseDto] })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Busca de usuário', description: 'Enpoint para buscar usuário' })
  @ApiOkResponse({ description: 'Usuário encontrado com sucesso', type: UserRelatedResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiCommonResponses()
  @ApiOperation({ summary: 'Atualizar usuário', description: 'Enpoint para atualizar usuário' })
  @ApiOkResponse({ description: 'Atualizado com sucesso', type: UserResponseDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
