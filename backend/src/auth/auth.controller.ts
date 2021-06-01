import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  /**
   * Generates a new JWT from user authentication.
   */
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.findByCredentials(loginDto);

    if (!user) {
      throw new UnauthorizedException(['invalid credentials, try again']);
    }

    const token = await this.authService.createToken(user);

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }

  /**
   * Registers a new user on the database.
   */
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.passwordConfirmation) {
      throw new BadRequestException([
        'password doest not match the confirmation',
      ]);
    }

    if (await this.userService.find({ email: registerDto.email })) {
      throw new BadRequestException(['this email is already taken']);
    }

    const user = await this.authService.register(registerDto);

    const token = await this.authService.createToken(user);

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
