import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
    Delete,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus,
    Req,
    ForbiddenException,
    NotFoundException,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('assignments')
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) { }

    @Post()
    @Roles(UserRole.COMMANDER)
    async create(@Body() createAssignmentDto: CreateAssignmentDto) {
        return this.assignmentsService.create(createAssignmentDto);
    }

    @Get()
    @Roles(UserRole.COMMANDER)
    async findAll(
        @Query('limit') limit = '10',
        @Query('offset') offset = '0',
    ) {
        const lim = Math.min(Number(limit), 100);
        const off = Number(offset);
        return this.assignmentsService.findAllPaginated(lim, off);
    }

    @Get('my-assignments')
    @Roles(UserRole.COMMANDER, UserRole.SOLDIER)
    async findMyAssignments(@Req() req) {
        return this.assignmentsService.findByUserId(req.user.userId);
    }

    @Get(':id')
    @Roles(UserRole.COMMANDER, UserRole.SOLDIER)
    async findOne(@Param('id') id: string, @Req() req) {
        const assignment = await this.assignmentsService.findOne(parseInt(id, 10));
        if (!assignment) {
            throw new NotFoundException('Assignment not found');
        }
        if (req.user.role === UserRole.SOLDIER && assignment.userId !== req.user.userId) {
            throw new ForbiddenException('Access to this assignment is forbidden.');
        }
        return assignment;
    }

    @Patch(':id')
    @Roles(UserRole.COMMANDER)
    async update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
        const updated = await this.assignmentsService.update(parseInt(id, 10), updateAssignmentDto);
        if (!updated) {
            throw new NotFoundException('Assignment not found');
        }
        return updated;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(UserRole.COMMANDER)
    async remove(@Param('id') id: string) {
        const success = await this.assignmentsService.remove(parseInt(id, 10));
        if (!success) {
            throw new NotFoundException('Assignment not found');
        }
    }
}
