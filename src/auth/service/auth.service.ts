import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from '../utils/UserType';
import { emit } from 'process';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async signIn(newUser: UserType) {
    const checkEmail = await this.prisma.user.findFirst({
      where: { email: newUser.email },
    });
    if (checkEmail) {
      throw new HttpException('email exist', HttpStatus.NOT_ACCEPTABLE);
    }
    const hashPassword = await bcrypt.hash(newUser.password,12);
    const n_user = await this.prisma.user.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        password: hashPassword,
      },
      select: {
        id: false,
        password: false,
        name: true,
        email: true,
      },
    });
    return { status: true, res: n_user };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new HttpException('wrong password', HttpStatus.NOT_ACCEPTABLE);
    }
    const payload = { email: user.email, userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWTSECERT,
      }),
    };
  }
}
