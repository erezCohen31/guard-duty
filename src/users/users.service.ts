import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserCreationAttributes } from './user.entity';
import { CreateUserInternalDto } from './dto/create-user-internal.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async create(userData: CreateUserInternalDto): Promise<User> {
        return this.userModel.create(userData);
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll({
            attributes: { exclude: ['hashedPassword'] },
        });
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userModel.findByPk(id, {
            attributes: { exclude: ['hashedPassword'] },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ where: { email } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);

        const updateData: Partial<UpdateUserDto & { hashedPassword?: string }> = { ...updateUserDto };

        if (updateUserDto.password) {
            updateData.hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
            delete updateData.password;
        }

        await user.update(updateData);
        return user;
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }
}
