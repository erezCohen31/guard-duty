import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}
