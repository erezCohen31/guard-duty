import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notificatio.dto';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post()
    async create(@Body() dto: CreateNotificationDto) {
        return this.notificationService.create(dto);
    }

    @Get('user/:id')
    async findAllByUser(@Param('id') userId: number) {
        return this.notificationService.findByUser(userId);
    }

    @Patch(':id/read')
    async markAsRead(@Param('id') id: number) {
        return this.notificationService.markAsRead(id);
    }
}
