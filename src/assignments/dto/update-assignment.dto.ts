import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateAssignmentDto {
    @IsOptional()
    @IsString()
    task?: string;

    @IsOptional()
    @IsInt()
    userId?: number;

}
