import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(pass, user.hashedPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { userId: user.id, email: user.email, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new BadRequestException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const newUser = await this.usersService.create({
            name: registerDto.name,
            email: registerDto.email,
            hashedPassword,
            role: registerDto.role || UserRole.SOLDIER,
        } as any);
        const payload = { userId: newUser.id, email: newUser.email, role: newUser.role };
        return {
            user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}