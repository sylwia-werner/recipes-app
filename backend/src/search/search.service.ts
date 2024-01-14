import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedRecipesDto } from 'src/recipes/dto';
import { RecipesService } from 'src/recipes/recipes.service';
import { DEFAULT_RECIPES_TOTAL_PAGES } from 'src/common/constants';

@Injectable()
export class SearchService {
  constructor(
    private prisma: PrismaService,
    private recipesService: RecipesService,
  ) {}
  async searchRecipes(
    query: string,
    page?: number,
    limit?: number,
  ): Promise<PaginatedRecipesDto> {
    const skip = (page - 1) * limit || 0;
    const take = (limit || DEFAULT_RECIPES_TOTAL_PAGES).toString();

    const recipes = await this.prisma.recipes.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      skip,
      // For some reason Primsa takes 'take' always as a string, unless you manually add parseInt explicitly to a variable 💩
      take: parseInt(take),
    });

    const transformedRecipes = this.recipesService.mapToRecipeDtos(recipes);

    const response = {
      result: transformedRecipes,
      total: transformedRecipes.length,
    };

    return response;
  }
}
