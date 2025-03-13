import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notifications } from 'src/entities/notifications.entity';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import EmailService from 'src/email/email.service';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notifications)
        private readonly notificationsRepository: Repository<Notifications>,
        private readonly emailService: EmailService,
    ) { }


    async getUserNotifications(userId: number) {
        try {
            return this.notificationsRepository.findOne({ where: { user: { id: userId } } })
        } catch (error) {
            throw new NotFoundException('Invalid user id')
        }
    }

    async notificationActivation(userId: number, notificationType: string) {

        let userNotifications = await this.notificationsRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user'],
        });

        if (!userNotifications) {
            userNotifications = this.notificationsRepository.create({
                user: { id: userId },
            });
        }

        if (!(notificationType in userNotifications)) {
            throw new NotFoundException(`Invalid notification type: ${notificationType}`);
        }

        userNotifications[notificationType] = !userNotifications[notificationType];

        await this.notificationsRepository.save(userNotifications);

        return userNotifications;
    }


    private getEmailTemplate(notificationType: string): { subject: string; html: string } {
        const templates = {
            newCityNotif: {
                subject: "A New City Has Been Added!",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">A New City is Available on ZainSpot!</h1>
                    <p>We are excited to announce that a new city has been added to our platform.</p>
                    <p>Discover new business opportunities and expand your reach.</p>
                `,
            },
            specialOfferNotif: {
                subject: "Exclusive Special Offer Just for You!",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Limited-Time Special Offer</h1>
                    <p>Get an exclusive discount on your next subscription upgrade!</p>
                    <p>Don't miss out. Act now before the offer expires!</p>
                `,
            },
            monthlyPaymentAlert: {
                subject: "Your Monthly Payment Reminder",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Your Payment is Due Soon</h1>
                    <p>Kind reminder: Your next payment is due in a few days.</p>
                    <p>Ensure uninterrupted access to ZainSpot services by completing your payment.</p>
                `,
            },
            passwordReset: {
                subject: "Reset Your Password",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Password Reset Request</h1>
                    <p>We received a request to reset your password.</p>
                    <p>If this was you, click below to reset your password. If not, please ignore this email.</p>
                `,
            },
            marketingNotif: {
                subject: "Exciting Updates from ZainSpot!",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Exciting Updates from ZainSpot!</h1>
                    <p>We have some amazing updates and features coming your way.</p>
                    <p>Stay ahead with the latest news and innovations.</p>
                    <a href="[marketing_link]" style="color: #007bff; text-decoration: underline;">Learn More</a>
                `,
            },
            birthdayNotif: {
                subject: "Happy Birthday from ZainSpot! 🎉",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Happy Birthday from ZainSpot! 🎉</h1>
                    <p>We wish you a fantastic day filled with joy and happiness!</p>
                    <p>As a special gift, enjoy an exclusive birthday surprise from us.</p>
                    <a href="[gift_link]" style="color: #007bff; text-decoration: underline;">Claim Your Gift</a>
                `,
            },
            greetingsNotif: {
                subject: "Season's Greetings from ZainSpot!",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Season’s Greetings from ZainSpot! 🎊</h1>
                    <p>We appreciate your support and wish you all the best this season.</p>
                    <p>Stay connected for more exciting updates in the coming year!</p>
                `,
            },
            paymentReceipt: {
                subject: "Payment Confirmation",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Payment Confirmation</h1>
                    <p>We have received your payment successfully.</p>
                    <p>Thank you for choosing ZainSpot!</p>
                    <p>Receipt details are available in your account.</p>
                    <a href="[receipt_link]" style="color: #007bff; text-decoration: underline;">View Receipt</a>
                `,
            },
            paymentFailure: {
                subject: "Payment Failed - Action Required",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Payment Failed</h1>
                    <p>We were unable to process your recent payment.</p>
                    <p>Please check your payment details and try again to avoid service interruption.</p>
                    <a href="[retry_payment_link]" style="color: #007bff; text-decoration: underline;">Retry Payment</a>
                `,
            },
            imminentPayment: {
                subject: "Upcoming Payment Due - Don't Miss Out!",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Upcoming Payment Due</h1>
                    <p>Your payment is due soon. Ensure uninterrupted service by completing your payment.</p>
                    <a href="[payment_link]" style="color: #007bff; text-decoration: underline;">Pay Now</a>
                `,
            },
            paymentExpired: {
                subject: "Your Subscription Has Expired - Renew Now!",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Your Subscription Has Expired</h1>
                    <p>Your subscription has expired due to a missed payment.</p>
                    <p>Renew now to continue enjoying our services.</p>
                    <a href="[renewal_link]" style="color: #007bff; text-decoration: underline;">Renew Now</a>
                `,
            },
            accModifications: {
                subject: "Your Account Has Been Updated",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Your Account Has Been Updated</h1>
                    <p>Your account details have been successfully updated.</p>
                    <p>If you did not make this change, please contact our support team immediately.</p>
                    <a href="[account_link]" style="color: #007bff; text-decoration: underline;">Review Changes</a>
                `,
            },
            securityIssues: {
                subject: "Security Alert - Unusual Activity Detected!",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Security Alert!</h1>
                    <p>We detected unusual activity on your account.</p>
                    <p>Please review and update your security settings.</p>
                    <a href="[security_link]" style="color: #007bff; text-decoration: underline;">Secure Your Account</a>
                `,
            },
            manualHocNotif: {
                subject: "Important Notification from ZainSpot",
                html: `
                    <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Important Notification</h1>
                    <p>You have received a new notification from ZainSpot.</p>
                    <p>Please check your dashboard for more details.</p>
                    <a href="[dashboard_link]" style="color: #007bff; text-decoration: underline;">View Notification</a>
                `,
            },
            
        };

        return templates[notificationType] || { subject: "ZainSpot Notification", html: "<p>Default email content.</p>" };
    }


    async sendNotifMail(email: string, notificationType: string) {
        try {
            const { subject, html } = this.getEmailTemplate(notificationType);

            const emailContent = `
                                <div style="background-color: #F3F3F3; width: 100%;">
                                <div style="background-color: #E8E8E8; font-family: 'Work Sans', Arial, sans-serif; padding: 20px; max-width: 858px; margin: auto;">
                                    <div style="text-align: center; margin-bottom: 10px; padding-top: 10px; padding-bottom: 10px;">
                                    <a href="/" style="color: #727272; text-decoration: underline; margin: 0 2px;">View in Browser</a>
                                    <a href="/" style="color: #727272; text-decoration: underline; margin: 0 2px;">Unsubscribe</a>
                                    </div>
                                    <div style="padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                                    <img style="margin-bottom: 20px;" src="cid:zainspot-logo" alt="ZainSpot Logo"/>
                                    ${html}
                                    </div>
                                    <div style="padding: 10px; margin-top: 20px; border-radius: 8px;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 10px;">
                                        <tr>
                                        <td style="text-align: left;">
                                            <img src="cid:zainspot-logo" alt="zainspot logo"/>
                                        </td>
                                        <td style="text-align: right; vertical-align: middle; align-items: center;">
                                            <a href=""><img src="cid:instagram-logo" alt="instagram logo" style="margin-right: 5px;"/></a>
                                            <a href=""><img src="cid:facebook-logo" alt="facebook logo" style="margin-right: 5px;"/></a>
                                            <a href=""><img src="cid:x-logo" alt="x logo" style="margin-right: 5px;"/></a>
                                            <a href=""><img src="cid:youtube-logo" alt="youtube logo"/></a>
                                        </td>
                                        </tr>
                                    </table>
                                    <h1 style="font-size: 12px;">ZainSpot, Inc.</h1>
                                    <p style="color:#B0B0B0; font-size: 12px;">
                                        Location,<br />
                                        Country
                                    </p>
                                    </div>
                                </div>
                                </div>
                            `;
            await this.emailService.sendMail({
                to: email,
                subject,
                html: emailContent,
                attachments: [{
                    "filename": "Logo_fm21jr.png",
                    "path": "https://res.cloudinary.com/dk1upobue/image/upload/v1725891603/emailVerification/Logo_fm21jr.png",
                    "cid": "zainspot-logo"
                },
                {
                    "filename": "instaLogo_kqhrd2.png",
                    "path": "https://res.cloudinary.com/dk1upobue/image/upload/v1725894295/emailVerification/instaLogo_kqhrd2.png",
                    "cid": "instagram-logo"
                },
                {
                    "filename": "facebookLogo_mq00s0.png",
                    "path": "https://res.cloudinary.com/dk1upobue/image/upload/v1725893722/emailVerification/facebookLogo_mq00s0.png",
                    "cid": "facebook-logo"
                },
                {
                    "filename": "XLogo_jmfnbt.png",
                    "path": "https://res.cloudinary.com/dk1upobue/image/upload/v1725893777/emailVerification/XLogo_jmfnbt.png",
                    "cid": "x-logo"
                },
                {
                    "filename": "youtubeLogo_yaajfa.png",
                    "path": "https://res.cloudinary.com/dk1upobue/image/upload/v1725894297/emailVerification/youtubeLogo_yaajfa.png",
                    "cid": "youtube-logo"
                },
                    // {
                    //   "filename": "checkIcon_ns1nbt.png",
                    //   "path": "https://res.cloudinary.com/dk1upobue/image/upload/f_auto,q_auto:eco,w_20,h_20/v1729592892/emailVerification/checkIcon_ns1nbt.png",
                    //   "cid": "checkIcon"
                    // }
                ]
            });
        } catch (error) {
            throw new Error('Failed to send email');
        }

    }

    async sendNewNotification(notificationType: string) {
        try {
            const validNotificationTypes = [
                'newCityNotif', 'specialOfferNotif', 'monthlyPaymentAlert',
                'passwordReset', 'marketingNotif', 'birthdayNotif',
                'greetingsNotif', 'paymentReceipt', 'paymentFailure',
                'imminentPayment', 'paymentExpired', 'accModifications',
                'securityIssues', 'manualHocNotif',
            ];

            if (!validNotificationTypes.includes(notificationType)) {
                throw new NotFoundException(`Invalid notification type: ${notificationType}`);
            }

            const users = await this.notificationsRepository.find({
                where: { [notificationType]: true },
                relations: ['user'],
            });

            if (users.length === 0) {
                console.log('No users have enabled this notification type.');
                return [];
            }

            const userEmails = users.map((notification) => notification.user.email);

            await Promise.all(userEmails.map(email => this.sendNotifMail(email, notificationType)));

            return userEmails;
        } catch (error) {
            console.error("Error in sendNewNotification:", error);
            throw new InternalServerErrorException(error.message);
        }
    }


}


