import { IsString, IsEmail, IsOptional, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../user.entity';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
