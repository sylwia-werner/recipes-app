import { PrismaService } from 'src/prisma/prisma.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { recipes } from '@prisma/client';
import {
  CreateRecipeDto,
  PaginatedRecipesDto,
  RecipeDto,
  UpdateRecipeDto,
} from './dto';
import { DEFAULT_RECIPES_TOTAL_PAGES, Difficulty } from 'src/common/constants';
import { UsersService } from 'src/users/users.service';

// TODO: Error handling

@Injectable()
export class RecipesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async getRecipes(
    page?: number,
    limit?: number,
  ): Promise<PaginatedRecipesDto> {
    const skip = (page - 1) * limit || 0;
    const take = (limit || DEFAULT_RECIPES_TOTAL_PAGES).toString();

    const recipes = await this.prisma.recipes.findMany({
      skip,
      // For some reason Primsa takes 'take' always as a string, unless you manually add parseInt explicitly to a variable 💩
      take: parseInt(take),
    });

    const transformedRecipes = this.mapToRecipeDtos(recipes);

    return {
      result: transformedRecipes,
      total: transformedRecipes.length,
    };
  }

  async getRecipeById(id: string): Promise<RecipeDto> {
    const foundRecipe = await this.prisma.recipes.findUnique({
      where: { id },
    });

    if (!foundRecipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    const transformedRecipe = this.mapToRecipeDto(foundRecipe);

    return transformedRecipe;
  }

  async addRecipe(
    newRecipe: CreateRecipeDto,
    userId: string,
  ): Promise<RecipeDto> {
    const foundUser = await this.usersService.userExists(userId);

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const createdRecipe = await this.prisma.recipes.create({
      data: {
        ...newRecipe,
        difficulty: newRecipe.difficulty as Difficulty,
        userId: userId,
      },
    });

    const transformedRecipe = this.mapToRecipeDto(createdRecipe);

    return transformedRecipe;
  }

  async updateRecipe(
    recipeId: string,
    userId: string,
    newRecipe: UpdateRecipeDto,
  ): Promise<RecipeDto> {
    const foundRecipe = await this.verifyAuthor(recipeId, userId);

    if (!foundRecipe) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const updatedRecipe = await this.prisma.recipes.update({
      where: { id: recipeId },
      data: newRecipe,
    });

    const transformedRecipe = this.mapToRecipeDto(updatedRecipe);

    return transformedRecipe;
  }

  async deleteRecipe(recipeId: string, userId: string) {
    const foundRecipe = await this.verifyAuthor(recipeId, userId);

    if (!foundRecipe) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    await this.prisma.recipes.delete({
      where: { id: recipeId },
    });
  }

  mapToRecipeDtos(recipesFromDatabase: recipes[]): RecipeDto[] {
    return recipesFromDatabase.map((recipeFromDb) => ({
      ...recipeFromDb,
      difficulty: recipeFromDb.difficulty as Difficulty,
    }));
  }

  mapToRecipeDto(recipe: recipes): RecipeDto {
    return {
      ...recipe,
      difficulty: recipe.difficulty as Difficulty,
    };
  }

  async verifyAuthor(recipeId: string, userId: string): Promise<boolean> {
    const recipe = await this.prisma.users.findFirst({
      where: {
        recipes: {
          some: {
            userId: userId,
            id: recipeId,
          },
        },
      },
    });

    return !!recipe;
  }
}
