import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { recipes } from '@prisma/client';
import { CreateRecipeDto, RecipeDto, UpdateRecipeDto } from './dto';
import { Difficulty } from 'src/common/constants';
import { UsersService } from 'src/users/users.service';

// TODO: Error handling

@Injectable()
export class RecipesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async getRecipes(): Promise<RecipeDto[]> {
    const recipesFromDatabase = await this.prisma.recipes.findMany();
    return this.mapToRecipeDtos(recipesFromDatabase);
  }

  async getRecipeById(id: string): Promise<RecipeDto> {
    const foundRecipe = await this.prisma.recipes.findUnique({
      where: { id },
    });

    const transformedRecipe = this.mapToRecipeDto(foundRecipe);

    return transformedRecipe;
  }

  async addRecipe(newRecipe: CreateRecipeDto): Promise<RecipeDto> {
    const { userId } = newRecipe;

    const foundUser = await this.usersService.userExists(userId);

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const createdRecipe = await this.prisma.recipes.create({
      data: {
        ...newRecipe,
        difficulty: newRecipe.difficulty as Difficulty,
        userId: newRecipe.userId,
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
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }

    const updatedRecipe = await this.prisma.recipes.update({
      where: { id: recipeId },
      data: newRecipe,
    });

    const transformedRecipe = this.mapToRecipeDto(updatedRecipe);

    return transformedRecipe;
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

  // private isDifficultyType(str: string): str is Difficulty {
  //   return Object.values(Difficulty).includes(str as any);
  // }

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
