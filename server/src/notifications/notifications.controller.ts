import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {

    constructor(
        private readonly notificationService: NotificationsService
    ) { }

    @Public()
    @Get(':notificationType')
    async getUsersWithNewCityNotif(
        @Param('notificationType') notificationType: string,
    ) {
        return this.notificationService.sendNewNotification("asa", notificationType)
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
        @Body() body: { object: string }
    ) {
        return await this.notificationService.sendNewNotification(body.object, notificationType);
    }

    


}
