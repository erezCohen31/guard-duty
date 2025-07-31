import { IsString, IsOptional, IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateNotificationDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsInt()
    recipientId: number;

    @IsOptional()
    @IsBoolean()
    isScheduled?: boolean;

    @IsOptional()
    @IsDateString()
    scheduledAt?: string;
}

export class MarkAsReadDto {
    @IsBoolean()
    isRead: boolean;
}
