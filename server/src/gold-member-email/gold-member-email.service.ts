import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import EmailService from 'src/email/email.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoldMemberEmailService {
  private readonly logger = new Logger(GoldMemberEmailService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly userService: UserService
  ) { }

  public async sendVerification(email: string): Promise<void> {
    try {

      const user = await this.userService.findByEmail(email);

      if (!user) {
        throw new NotFoundException("Email doesn't exist ")
      }

      const token = this.jwtService.sign(
        {
          userId: user.id,
          email: user.email
        },
        {
          secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
          expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`,
        });

      const frontendUrl = `${process.env.CLIENT_URL}/email-confirmation?token=${token}`;
      const html = `
    <div style="background-color: #F3F3F3; width: 100%;">
      <div style="background-color: #E8E8E8; font-family: 'Work Sans', Arial, sans-serif; padding: 20px; max-width: 858px; margin: auto;">
        <div style="text-align: center; margin-bottom: 10px; padding-top: 10px; padding-bottom: 10px;">
          <a href="/" style="color: #727272; text-decoration: underline; margin: 0 2px;">View in the browser</a>
          <a href="/" style="color: #727272; text-decoration: underline; margin: 0 2px;">Unsubscribe</a>
        </div>
        <div style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 300; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <img src="cid:zainspot-logo" alt="zainspot logo"/>
          <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">You are now a ZS Gold member!</h1>
          <p>Hi ${user?.name},</p>
          <p >You have updated your subscription to the ZS Gold on London ZainSpot.</p>
          <p >Here are your new benefits:</p>
          <ul style="list-style-type: none; padding: 0;">
            <li style="display: flex; align-items: center; margin-bottom: 8px;">
              <img src="https://res.cloudinary.com/dk1upobue/image/upload/v1729593851/emailVerification/checkmark_tqx5r4.svg" width="20" height="20" alt="checkmark" style="margin-right: 8px;" />
              Your Business Address
            </li>
            <li style="display: flex; align-items: center; margin-bottom: 8px;">
              <img src="https://res.cloudinary.com/dk1upobue/image/upload/v1729593851/emailVerification/checkmark_tqx5r4.svg" width="20" height="20" alt="checkmark" style="margin-right: 8px;" />
              Mail Handling
            </li>
            <li style="display: flex; align-items: center; margin-bottom: 8px;">
              <img src="https://res.cloudinary.com/dk1upobue/image/upload/v1729593851/emailVerification/checkmark_tqx5r4.svg" width="20" height="20" alt="checkmark" style="margin-right: 8px;" />
              Your Local Phone Number
            </li>
          </ul>

          <a href="${frontendUrl}" style="display: inline-block; background-color: #00927C; color: #FFFFFF; font-weight: bold; border-radius: 5px; padding: 10px 20px; text-decoration: none; text-align: center; font-size: 14px; margin-top: 10px;">Go to e-Print</a>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 300; font-size: 16px; line-height: 25.6px; color: #666666; margin-top: 20px;">If you have any questions, our support team is just an email away.</p>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 300; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;">Thank you,<br />The ZainSpot Team</p>
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
        subject: 'Zainspot Gold Member',
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
          // {
          //   "filename": "checkIcon_ns1nbt.png",
          //   "path": "https://res.cloudinary.com/dk1upobue/image/upload/f_auto,q_auto:eco,w_20,h_20/v1729592892/emailVerification/checkIcon_ns1nbt.png",
          //   "cid": "checkIcon"
          // }
        ]
      });
      this.logger.log(`Verification email sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send email to ${email}`,
        error.stack,
      );
      throw new Error('Failed to send email');
    }
  }

}
