import { Injectable, NotFoundException } from '@nestjs/common';
import EmailService from 'src/email/email.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PaymentEmailService {
    constructor(
        private readonly emailService: EmailService,
        private readonly userService: UserService
    ) { }

    public async sendAlert(email: string): Promise<void> {
        try {
            const user = this.userService.findByEmail(email);

            if (!user) {
                throw new NotFoundException('User Not found!');
            }

            const html = `
           <div style="background-color: #F3F3F3; width: 100%; display: flex; justify-content: center; padding: 20px 0;">
            <div style="background-color: #E8E8E8; font-family: 'Work Sans', Arial, sans-serif; padding: 20px; max-width: 70%; width: 100%; margin: auto; box-sizing: border-box;">
                <div style="text-align: center; margin-bottom: 10px; padding-top: 10px; padding-bottom: 10px;">
                <a href="/" style="color: #727272; text-decoration: underline; margin: 0 2px;">View in the browser</a>
                <a href="/" style="color: #727272; text-decoration: underline; margin: 0 2px;">Unsubscribe</a>
                </div>
                <div style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 300; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <img src="cid:zainspot-logo" alt="zainspot logo" style="margin-bottom: 30px;" />
                <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px">Congratulations!</h1>
                <p>You are now subscribed to London ZainSpot.</p>
                <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px">Payment Details</h1>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li>
                    <table width="100%" style="border-collapse: collapse;">
                        <tr>
                            <td style="text-align: left;">Subtotal</td>
                            <td style="text-align: right;">131.50</td>
                        </tr>
                        <tr style="color: #00826D;">
                            <td style="text-align: left; border-bottom: 1px solid #F3F3F3; padding-bottom: 10px;">Discount (15%)</td>
                            <td style="text-align: right; border-bottom: 1px solid #F3F3F3; padding-bottom: 10px;">-8.00</td>
                        </tr>                    
                       <tr>
                            <td style="text-align: left; padding-top: 10px;">Order total</td>
                            <td style="text-align: right; padding-top: 10px;">
                                <div>
                                    <p style="margin: 0;">123.50</p>
                                    <p style="margin: 0;">usd</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                        <td style="text-align: center;">
                            <a href="#" style="display: inline-flex; align-items: center; border: 2px solid #00927C; color: #00927C; font-weight: bold; border-radius: 5px; padding: 10px 60px; text-decoration: none; font-size: 14px;">
                                <img src="cid:download-logo" alt="download logo" style="width: 20px; height: 20px; padding-right: 10px; padding-top: 2px;" />
                                Download Your Invoice
                            </a>
                        </td>
                        <td style="text-align: center;">
                            <div 
                                style="display: inline-flex; align-items: center;justify-content: center; gap: 10px; background-color: #00927C; color: #FFFFFF; font-weight: bold; border-radius: 5px; padding: 10px 60px; font-size: 14px;">
                                <img src="cid:star-logo" alt="star logo" style="width: 20px; height: 20px; padding-right: 10px; padding-top: 2px;" />
                                Rate Your Experience
                            </div>
                        </td>
                    </tr>


                    </table>
                    </li>
                </ul>
                </div>
                <div style="padding: 10px; margin-top: 20px; border-radius: 8px; text-align: center;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 10px;">
                    <tr>
                    <td style="text-align: left;">
                        <img src="cid:zainspot-logo" alt="zainspot logo" />
                    </td>
                    </tr>
                    <tr>
                        <td style="text-align: left;">
                            <h1 style="font-size: 12px; ">ZainSpot, Inc.</h1>
                            <p style="color:#B0B0B0; font-size: 12px;">
                                Location,<br />
                                Country
                            </p>
                        </td>
                        <td style="text-align: right; vertical-align: middle;">
                            <a href="#"><img src="cid:instagram-logo" alt="instagram logo" style="margin-right: 5px; max-width: 20px;" /></a>
                            <a href="#"><img src="cid:facebook-logo" alt="facebook logo" style="margin-right: 5px; max-width: 20px;" /></a>
                            <a href="#"><img src="cid:x-logo" alt="x logo" style="margin-right: 5px; max-width: 20px;" /></a>
                            <a href="#"><img src="cid:youtube-logo" alt="youtube logo" style="max-width: 20px;" /></a>
                        </td>
                    </tr>
                </table>
                
                </div>
            </div>
            </div>
          `;

            await this.emailService.sendMail({
                to: email,
                subject: 'Payment Alert',
                html,
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
                {
                    "filename": "download_zumtzf.png",
                    "path": "https://res.cloudinary.com/dk1upobue/image/upload/v1734088405/emailVerification/download_zumtzf.png",
                    "cid": "download-logo"
                },
                {
                    "filename": "star-outline_fdasuh.png",
                    "path": "https://res.cloudinary.com/dk1upobue/image/upload/v1734088505/emailVerification/star-outline_fdasuh.png",
                    "cid": "star-logo"
                }
                ]
            });
        } catch (error) {
            throw new Error('Failed to send email');
        }
    }
}
