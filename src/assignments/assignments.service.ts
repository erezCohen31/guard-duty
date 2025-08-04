import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Assignment } from './assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { NotificationService } from '../notifications/notifications.service';
import { Shift } from '../shifts/shift.entity';

@Injectable()
export class AssignmentsService {
    constructor(
        @InjectModel(Assignment)
        private assignmentModel: typeof Assignment,
        @InjectModel(Shift)
        private shiftModel: typeof Shift,
        private notificationService: NotificationService,
    ) { }

    async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
        const assignment = await this.assignmentModel.create(createAssignmentDto as any);

        const shift = await this.shiftModel.findByPk(assignment.shiftId);

        await this.notificationService.create({
            title: 'New Guard Assignment',
            content: `You have a new guard duty on ${shift?.startTime.toLocaleString()} at ${shift?.location || 'unknown location'}.`,
            recipientId: assignment.userId,
            isScheduled: false,
            scheduledAt: null,
        });

        return assignment;
    }

    async findAll(): Promise<Assignment[]> {
        return this.assignmentModel.findAll();
    }

    async findAllPaginated(limit: number, offset: number): Promise<Assignment[]> {
        return this.assignmentModel.findAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
    }

    async findByUserId(userId: number): Promise<Assignment[]> {
        return this.assignmentModel.findAll({ where: { userId } });
    }

    async findOne(id: number): Promise<Assignment | null> {
        return this.assignmentModel.findByPk(id);
    }

    async update(id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<Assignment | null> {
        const assignment = await this.findOne(id);
        if (!assignment) {
            return null;
        }
        await assignment.update(updateAssignmentDto);
        return assignment;
    }

    async remove(id: number): Promise<boolean> {
        const assignment = await this.findOne(id);
        if (!assignment) {
            return false;
        }
        await assignment.destroy();
        return true;
    }
}
