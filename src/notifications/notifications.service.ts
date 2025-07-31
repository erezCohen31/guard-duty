import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './notifications.entity';
import { CreateNotificationDto } from './dto/create-notificatio.dto';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification)
        private notificationModel: typeof Notification,
    ) { }

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return this.notificationModel.create({
            ...createNotificationDto,
            isRead: false,
            isScheduled: createNotificationDto.isScheduled ?? false,
            scheduledAt: createNotificationDto.scheduledAt
                ? new Date(createNotificationDto.scheduledAt)
                : null,
        });
    }

    async findAll(): Promise<Notification[]> {
        return this.notificationModel.findAll({
            order: [['createdAt', 'DESC']],
        });
    }

    async findByUser(userId: number): Promise<Notification[]> {
        return this.notificationModel.findAll({
            where: { recipientId: userId },
            order: [['createdAt', 'DESC']],
        });
    }

    async findOne(id: number): Promise<Notification> {
        const notification = await this.notificationModel.findByPk(id);
        if (!notification) {
            throw new NotFoundException(`Notification with ID ${id} not found`);
        }
        return notification;
    }

    async markAsRead(id: number): Promise<Notification> {
        const notification = await this.findOne(id);
        notification.isRead = true;
        await notification.save();
        return notification;
    }

    async remove(id: number): Promise<void> {
        const notification = await this.findOne(id);
        await notification.destroy();
    }
}
