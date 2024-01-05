import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  hashData(data: string) {
    return argon.hash(data);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const payload = {
      id: userId,
      email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'at-secret',
        expiresIn: 900,
        // secret: this.configService.get<string>('at_secret'),
        // expiresIn: this.configService.get<number>('at_expiration'),
      }),
      this.jwtService.signAsync(payload, {
        secret: 'rt-secret',
        expiresIn: 604800,
        // secret: this.configService.get<string>('rt_secret'),
        // expiresIn: this.configService.get<number>('rt_expiration'),
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: string, rt: string) {
    const hashedRt = await this.hashData(rt);

    await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt,
      },
    });
  }

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);

    const newUser = await this.prisma.users
      .create({
        data: {
          email: dto.email,
          hash,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User does not exist.');
    }

    const passwordMatches = await argon.verify(user.hash, dto.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Incorrect password.');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    // updateMany to avoid spamming for instance logout button,
    // sending many requests and setting hashedRt to null
    console.log(userId, 'userId | Service');
    await this.prisma.users.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });

    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException('Access denied');

    const isRtMatching = await argon.verify(user.hashedRt, rt);

    if (!isRtMatching) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
}
