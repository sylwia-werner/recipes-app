import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { PaginatedRecipesDto } from 'src/recipes/dto';
import { Public } from 'src/decorators';

@Controller('search')
export class SearchController {
  constructor(private recipesService: SearchService) {}

  @Public()
  @Get()
  searchRecipes(
    @Query('query') query: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('difficulty') difficulty: string,
  ): Promise<PaginatedRecipesDto> {
    return this.recipesService.searchRecipes(query, page, limit, difficulty);
  }
}
