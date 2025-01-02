import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import VerificationTokenPayload from './verificationTokenPayload.interface';
import EmailService from 'src/email/email.service';
import { UserService } from 'src/user/user.service';


@Injectable()
export class EmailConfirmationService {
  private readonly logger = new Logger(EmailConfirmationService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    @Inject(UserService) private readonly userService: UserService,
  ) { }

  public async sendVerificationLink(email: string): Promise<void> {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`,
    });

    let frontendUrl = '';
    if (process.env.NODE_ENV === 'development') {
      frontendUrl = `http://localhost:3000/email-confirmation?token=${token}`;
    } else {
      frontendUrl = `http://zainspot.com/email-confirmation?token=${token}`;
    }
    const html = `
    <div style="background-color: #F3F3F3; width: 100%;">
      <div style="background-color: #E8E8E8; font-family: 'Work Sans', Arial, sans-serif; padding: 20px; max-width: 858px; margin: auto;">
        <div style="text-align: center; margin-bottom: 10px; padding-top: 10px; padding-bottom: 10px;">
          <a href="/" style="color: #727272; text-decoration: underline; margin: 0 2px;">View in the browser</a>
          <a href="/" style="color: #727272; text-decoration: underline; margin: 0 2px;">Unsubscribe</a>
        </div>
        <div style="padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <img src="cid:zainspot-logo" alt="zainspot logo"/>
          <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Confirm your email address</h1>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;">Hi there!</p>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;">We’re thrilled to have you on board at ZainSpot. Before you dive into going global with your virtual office, there’s just one small step left - verifying your email.</p>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;">Click the link below to confirm your email address.</p>
          <a href="${frontendUrl}" style="display: inline-block; background-color: #00927C; color: #FFFFFF; font-weight: bold; border-radius: 5px; padding: 10px 20px; text-decoration: none; text-align: center; font-size: 14px; margin-top: 10px;">CONFIRM EMAIL</a>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin-top: 20px;">If you have any questions, our support team is just an email away.</p>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;">Happy expansion,<br />The ZainSpot Team</p>
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


    try {
      await this.emailService.sendMail({
        to: email,
        subject: 'Email confirmation',
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
      });
      this.logger.log(`Verification email sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send verification email to ${email}`,
        error.stack,
      );
      throw new Error('Failed to send verification email');
    }
  }

  public async confirmEmail(token: string): Promise<void> {
    try {
      const payload = this.jwtService.verify<VerificationTokenPayload>(token, {
        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      });

      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.userService.markEmailAsConfirmed(payload.email);
      this.logger.log(`Email confirmed for ${payload.email}`);
    } catch (error) {
      if (error.message.includes('invalid signature')) {
        throw new Error('Invalid or expired token.');
      }
      this.logger.error(`Email confirmation failed: ${error.message}`, error.stack);
      throw new Error('Email confirmation failed');
    }
  }
}
