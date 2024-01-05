import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import config from 'config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards';
// import { AtGuard } from './auth/guards';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),
    AuthModule,
    PrismaModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}
