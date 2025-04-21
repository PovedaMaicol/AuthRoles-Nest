import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "src/common/enums/rol.enum";

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  
  @IsOptional()
  @IsString()
  @MinLength(4)
  role?: Role;
}