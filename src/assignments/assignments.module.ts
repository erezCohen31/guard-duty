import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignment } from './assignment.entity';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { UsersModule } from '../users/users.module';
import { ShiftsModule } from '../shifts/shifts.module';

@Module({
  imports: [SequelizeModule.forFeature([Assignment]), UsersModule, ShiftsModule],
  providers: [AssignmentsService],
  controllers: [AssignmentsController],
  exports: [AssignmentsService],
})
export class AssignmentsModule { }