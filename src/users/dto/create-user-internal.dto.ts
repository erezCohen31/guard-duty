import { UserRole } from '../user.entity';

export class CreateUserInternalDto {
    name: string;
    email: string;
    hashedPassword: string;
    role: UserRole;
}
