import { IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
export class RegisterDto {
  @IsString()
  @MinLength(3)
  @Transform(({ value }) => value.trim()) // limpia espacios en blanco
  username: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim()) // limpia espacios en blanco
  password: string;

  
  @IsOptional()
  @IsString()
  role: string;
}
