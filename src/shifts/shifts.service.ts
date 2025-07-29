import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shift } from './shift.entity';
import { Assignment } from '../assignments/assignment.entity';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Injectable()
export class ShiftsService {
    constructor(
        @InjectModel(Shift)
        private shiftModel: typeof Shift,
    ) { }

    async create(createShiftDto: CreateShiftDto): Promise<Shift> {
        return this.shiftModel.create(createShiftDto as any);
    }

    async findAll(): Promise<Shift[]> {
        return this.shiftModel.findAll();
    }

    async findOne(id: number): Promise<Shift> {
        const shift = await this.shiftModel.findByPk(id, {
            include: [{ model: Assignment }],
        });
        if (!shift) {
            throw new NotFoundException(`Shift with ID ${id} not found`);
        }
        return shift;
    }

    async update(id: number, updateShiftDto: UpdateShiftDto): Promise<Shift> {
        const shift = await this.findOne(id);
        await shift.update(updateShiftDto);
        return shift;
    }

    async remove(id: number): Promise<void> {
        const shift = await this.findOne(id);
        await shift.destroy();
    }
}
