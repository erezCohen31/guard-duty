import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    UseGuards,
    Req,
    ForbiddenException,
    NotFoundException,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('shifts')
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) { }

    @Post()
    @Roles(UserRole.COMMANDER)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createShiftDto: CreateShiftDto) {
        return this.shiftsService.create(createShiftDto);
    }

    @Get()
    @Roles(UserRole.COMMANDER)
    findAll() {
        return this.shiftsService.findAll();
    }


    @Get(':id')
    @Roles(UserRole.COMMANDER, UserRole.SOLDIER)
    async findOne(@Param('id') id: string, @Req() req: any) {
        const userRole = req.user.role;
        const userId = req.user.userId;
        const shiftId = parseInt(id, 10);

        const shift = await this.shiftsService.findOne(shiftId);
        if (!shift) {
            throw new NotFoundException(`Shift with ID ${shiftId} not found`);
        }

        if (userRole === UserRole.SOLDIER) {
            const isAssigned = shift.assignments?.some(a => a.userId === userId);
            if (!isAssigned) {
                throw new ForbiddenException('Access denied: You are not assigned to this shift');
            }
        }

        return shift;
    }

    @Patch(':id')
    @Roles(UserRole.COMMANDER)
    update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
        return this.shiftsService.update(parseInt(id, 10), updateShiftDto);
    }

    @Delete(':id')
    @Roles(UserRole.COMMANDER)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.shiftsService.remove(parseInt(id, 10));
    }
}
