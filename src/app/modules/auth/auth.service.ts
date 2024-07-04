import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/app/modules/auth/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user || !bcrypt.compareSync(loginDto.password, user.hashPassword)) {
      throw new Error('Invalid credentials');
    }
    const { hashPassword, ...result } = user;

    return {
      access_token: this.jwtService.sign(result),
    };
  }

}
