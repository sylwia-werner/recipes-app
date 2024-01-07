import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetUserId, Public } from 'src/decorators';
import { RecipesService } from './recipes.service';
import {
  CreateRecipeDto,
  PaginatedRecipesDto,
  RecipeDto,
  UpdateRecipeDto,
} from './dto';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  getRecipes(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<PaginatedRecipesDto> {
    return this.recipesService.getRecipes(page, limit);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getRecipe(@Param('id') id: string): Promise<RecipeDto> {
    return this.recipesService.getRecipeById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addRecipe(
    @GetUserId() userId: string,
    @Body() recipe: CreateRecipeDto,
  ): Promise<RecipeDto> {
    return this.recipesService.addRecipe(recipe, userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateRecipe(
    @GetUserId() userId: string,
    @Param('id') recipeId: string,
    @Body() updatedRecipe: UpdateRecipeDto,
  ): Promise<RecipeDto> {
    return this.recipesService.updateRecipe(recipeId, userId, updatedRecipe);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteRecipe(@GetUserId() userId: string, @Param('id') recipeId: string) {
    return this.recipesService.deleteRecipe(recipeId, userId);
  }
}
