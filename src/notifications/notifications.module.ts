import { Module } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { NotificationController } from './notifications.controller';

@Module({
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule { }
