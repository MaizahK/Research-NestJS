import {
  IsEmail,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  MinLength
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  street: string;

  @IsNumber()
  postalCode: number;

  @IsString()
  district: string;
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @MinLength(8)
  password: string; // ✅ REQUIRED

  @IsArray()
  @IsString({ each: true })
  hobbies: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
}
