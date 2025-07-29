import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    UseGuards,
    Req,
    ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './user.entity';
import * as bcrypt from 'bcryptjs';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @Roles(UserRole.COMMANDER)
    async create(@Body() createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const userToCreate = {
            name: createUserDto.name,
            email: createUserDto.email,
            hashedPassword,
            role: createUserDto.role,
        };
        return this.usersService.create(userToCreate);
    }

    @Get()
    @Roles(UserRole.COMMANDER)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @Roles(UserRole.COMMANDER, UserRole.SOLDIER)
    async findOne(@Param('id') id: string, @Req() req: any) {
        const userRole = req.user.role;
        const userId = req.user.userId;

        if (userRole === UserRole.SOLDIER && userId !== +id) {
            throw new ForbiddenException('You can only access your own data');
        }

        return this.usersService.findOne(+id);
    }


    @Patch(':id')
    @Roles(UserRole.COMMANDER, UserRole.SOLDIER)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: any) {
        const userRole = req.user.role;
        const userId = req.user.userId;

        if (userRole === UserRole.SOLDIER && userId !== +id) {
            throw new ForbiddenException('You can only update your own data');
        }

        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @Roles(UserRole.COMMANDER)
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
