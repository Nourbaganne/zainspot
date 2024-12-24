import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ResetPasswordService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    private transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    public async sendRequestEmail(email: string): Promise<void> {
        try {
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new NotFoundException('Email does not exist');
            }

            const resetToken = this.jwtService.sign(
                { userId: user.id, email: user.email },
                { secret: process.env.JWT_VERIFICATION_TOKEN_SECRET, expiresIn: '10m' }
            );

            let baseUrl= ''
            if (process.env.NODE_ENV === 'development') {
              baseUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
            } else {
              baseUrl = `http://zainspot.com/reset-password?token=${resetToken}`;
            }

            const resetLink = baseUrl;
            const html = `
            <div style="background-color: #F3F3F3; width: 100%;">
              <div style="background-color: #E8E8E8; font-family: 'Work Sans', Arial, sans-serif; padding: 20px; max-width: 858px; margin: auto;">
                <div style="text-align: center; margin-bottom: 10px; padding-top: 10px; padding-bottom: 10px;">
                  <a href="/" style="color: #727272; text-decoration: underline; margin: 0 2px;">View in the browser</a>
                  <a href="/" style="color: #727272; text-decoration: underline; margin: 0 2px;">Unsubscribe</a>
                </div>
                <div style="padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                  <img src="cid:zainspot-logo" alt="zainspot logo"/>
                  <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Reset Password</h1>
                  <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;">Hi ${user?.name}, a request has been received to change the password for your ZainSpot account.</p>
                  <a href="${resetLink}" style="display: inline-block; background-color: #00927C; color: #FFFFFF; font-weight: bold; border-radius: 5px; padding: 10px 20px; text-decoration: none; text-align: center; font-size: 14px; margin-top: 10px;">RESET PASSWORD</a>
                  <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin-top: 20px;">If you didn’t initiate this request, simply ignore this email.</p>
                  <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;">Happy expansion,<br />Thank you,</br> The Zainspot team</p>
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

            const mailOptions = {
                from: 'your-email@gmail.com',
                to: email,
                subject: 'Reset your password',
                text: `Click the link to reset your password: ${resetLink}`,
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


                ]
            };


            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            throw new BadRequestException('Failed to send reset email');
        }
    }

    public async resetPassword(token: string, newPassword: string): Promise<void> {
        try {
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_VERIFICATION_TOKEN_SECRET });
    
            const user = await this.userService.findOne(decoded.userId);
    
            if (!user) {
                throw new NotFoundException('User not found');
            }
    
            await this.userService.update(user.id, { password: newPassword });
    
        } catch (err) {
            throw new BadRequestException('Invalid or expired token');
        }
    }
    
}
