import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('visitor')
export class VisitorController {
    constructor(private readonly visitorService: VisitorService) { }

    @Public()
    @Post()
    async trackVisitor(@Body('visitorId') visitorId: string) {
        if (!visitorId) {
            throw new BadRequestException('Visitor ID is required');
        }

        const savedVisitorId = await this.visitorService.trackVisitor(visitorId);
        return { visitorId: savedVisitorId };
    }

    @Get()
    async getVisitorStats(): Promise<{ totalVisitors: number; increasment: number }> {
        return this.visitorService.getVisitorStats();
    }

}
