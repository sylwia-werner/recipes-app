import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule, CacheModule.register()],
  controllers: [SearchController],
  providers: [SearchService, RecipesService, UsersService],
})
export class SearchModule {}
