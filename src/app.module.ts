import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './users/user.entity';
import { Shift } from './shifts/shift.entity';
import { Assignment } from './assignments/assignment.entity';
import { Notification } from './notifications/notifications.entity';


import { UsersModule } from './users/users.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notifications/notifications.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadModels: true,
        synchronize: true,
        models: [User, Shift, Assignment, Notification],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ShiftsModule,
    AssignmentsModule,
    AuthModule,
    NotificationModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule { }
