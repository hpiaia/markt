import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, genSalt, hash } from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Finds a user with a given email and password.
   */
  async findByCredentials({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    const user = await this.usersService.find({ email });

    if (user && (await compare(password, user.password))) return user;

    return null;
  }

  /**
   * Registers a new user in the database with an encrypted password.
   */
  async register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const hashedPassword = await hash(password, await genSalt());

    return this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  /**
   * Generates a JWT from a given user id.
   */
  async createToken({ id }: User) {
    return this.jwtService.sign({ userId: id });
  }
}
