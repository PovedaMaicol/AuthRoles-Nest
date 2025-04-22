import { IsEmpty, IsInt, IsOptional, IsPositive, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateCatDto {

  @IsString()
  @MinLength(2)
  name: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  @IsOptional()
  breed?: string;

  // @IsString()
  // @IsNotEmpty()
  // userName: string; // Nombre de usuario del creador del gato, se puede omitir si no se quiere asignar un creador al gato
}
