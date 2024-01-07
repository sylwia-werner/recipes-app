import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { RecipeDto } from './recipe.dto';

export class PaginatedRecipesDto {
  @IsArray()
  result: RecipeDto[];

  @IsNotEmpty()
  @IsNumber()
  total: number;
}
