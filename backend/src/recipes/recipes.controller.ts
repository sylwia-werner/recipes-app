import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GetUserId, Public } from 'src/decorators';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, RecipeDto, UpdateRecipeDto } from './dto';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Public()
  @Get()
  getRecipes(): Promise<RecipeDto[]> {
    return this.recipesService.getRecipes();
  }

  @Public()
  @Get(':id')
  getRecipe(@Param('id') id: string): Promise<RecipeDto> {
    return this.recipesService.getRecipeById(id);
  }

  @Post()
  addRecipe(@Body() recipe: CreateRecipeDto): Promise<RecipeDto> {
    return this.recipesService.addRecipe(recipe);
  }

  @Put(':id')
  updateRecipe(
    @GetUserId() userId: string,
    @Param('id') recipeId: string,
    @Body() updatedRecipe: UpdateRecipeDto,
  ): Promise<RecipeDto> {
    return this.recipesService.updateRecipe(recipeId, userId, updatedRecipe);
  }
}
