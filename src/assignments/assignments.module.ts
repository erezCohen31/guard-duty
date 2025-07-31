import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignment } from './assignment.entity';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { UsersModule } from '../users/users.module';
import { ShiftsModule } from '../shifts/shifts.module';
import { NotificationModule } from '../notifications/notifications.module';
import { Shift } from '../shifts/shift.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Assignment, Shift]),
    UsersModule,
    ShiftsModule,
    forwardRef(() => NotificationModule),
  ],
  providers: [AssignmentsService],
  controllers: [AssignmentsController],
  exports: [AssignmentsService],
})
export class AssignmentsModule { }
