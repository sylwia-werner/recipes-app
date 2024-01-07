import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Difficulty } from 'src/common/constants';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  ingredients: string[];

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsEnum(Difficulty)
  difficulty: Difficulty;
}
