import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {

    constructor(
        private readonly notificationService: NotificationsService
    ) { }


    @Get(':userId')
    async getUserNotifications(
        @Param('userId') userId: number,
    ) {
        return this.notificationService.getUserNotifications(userId)
    }

    @Public()
    @Patch(':userId/:notificationType')
    async updateNotificationStatus(
        @Param('userId') userId: number,
        @Param('notificationType') notificationType: string,
    ) {
        return this.notificationService.notificationActivation(userId, notificationType);
    }

    @Public()
    @Post('send/:notificationType')
    async sendNewNotification(
        @Param('notificationType') notificationType: string,
    ) {
        return await this.notificationService.sendNewNotification( notificationType);
    }




}
