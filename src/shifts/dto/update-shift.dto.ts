import { IsDateString, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateShiftDto {
    @IsOptional()
    @IsDateString()
    startTime?: Date;

    @IsOptional()
    @IsDateString()
    endTime?: Date;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    location?: string;
}