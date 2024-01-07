import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [PrismaModule, CacheModule.register()],
  controllers: [RecipesController],
  providers: [RecipesService, UsersService],
})
export class RecipesModule {}
