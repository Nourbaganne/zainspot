import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsService } from './notifications.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BirthdayService {
    private readonly logger = new Logger(BirthdayService.name);

    constructor(
        private readonly usersService: UserService,
        private readonly notificationsService: NotificationsService
    ) { }

    // Run every day at 00:00 (midnight)
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async sendBirthdayNotifications() {
        this.logger.log('Checking for birthdays...');

        const today = new Date();
        const currentMonth = today.getMonth() + 1;  // JS months are 0-based
        const currentDay = today.getDate();

        // Fetch users whose birthday is today
        const users = await this.usersService.findUsersWithBirthday(currentMonth, currentDay);

        if (users.length > 0) {
            this.logger.log(`Found ${users.length} users with birthdays today!`);

            // Use Promise.all to send notifications concurrently
            await Promise.all(users.map(async (user) => {
                await this.notificationsService.sendBirthdayNotification(user.id);
            }));

            this.logger.log('Birthday notifications sent successfully.');
        } else {
            this.logger.log('No birthdays today.');
        }
    }
}
