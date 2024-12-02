import { Injectable } from '@nestjs/common';
import { And, LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Visitor } from 'src/entities/visitor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class VisitorService {
    constructor(
        @InjectRepository(Visitor)
        private readonly visitorRepository: Repository<Visitor>,
    ) { }

    async trackVisitor(visitorId: string): Promise<string> {
        const visitor = this.visitorRepository.create({ visitorId });
        await this.visitorRepository.save(visitor);
        return visitorId;
    }

    async getVisitorStats(): Promise<{ totalVisitors: number; increasment: number }> {

        const totalVisitors = await this.visitorRepository.count();

        // Get the first day of the current month
        const currentMonthStart = new Date();
        currentMonthStart.setDate(1);
        currentMonthStart.setHours(0, 0, 0, 0);

        // Get the first day of the previous month
        const previousMonthStart = new Date(currentMonthStart);
        previousMonthStart.setMonth(previousMonthStart.getMonth() - 1);

        // Count visitors from the previous month
        const previousMonthVisitors = await this.visitorRepository.count({
            where: {
                createdAt: And(
                    MoreThanOrEqual(previousMonthStart),
                    LessThan(currentMonthStart)
                ),
            },
        });

        // Count visitors from the current month
        const currentMonthVisitors = await this.visitorRepository.count({
            where: {
                createdAt: MoreThanOrEqual(currentMonthStart),
            },
        });

        // Calculate increment
        const increasment = currentMonthVisitors - previousMonthVisitors;

        return {
            totalVisitors,
            increasment,
        };
    }
}
