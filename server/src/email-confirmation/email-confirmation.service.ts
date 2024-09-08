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

    const frontendUrl = `${process.env.FRONTEND_URL}/email-confirmation?token=${token}`;
    const html = `
    <div style="background-color: #F3F3F3; width: 100%">
      <div style="font-family: 'Work Sans', Arial, sans-serif; padding: 20px; max-width: 858px; margin: auto;">
        <div style="text-align: center; margin-bottom: 10px; padding-top: 10px; padding-bottom: 10px;">
          <a href="/" style="color: #727272; text-decoration: underline; margin: 0 10px;">View in the browser</a>
          <a href="/" style="color: #727272; text-decoration: underline; margin: 0 10px;">Unsubscribe</a>
        </div>
        <div style="padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <img src="https://asset.cloudinary.com/dk1upobue/b79c17024850cff8d0ce31e9252299c5" alt="ZainSpot Logo" style="width: 100%; height: auto;" />
          <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Confirm your email address</h1>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;">Hi there!</p>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;">We’re thrilled to have you on board at ZainSpot. Before you dive into going global with your virtual office, there’s just one small step left - verifying your email.</p>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;">Click the link below to confirm your email address.</p>
          <a href="${frontendUrl}" style="display: inline-block; background-color: #00927C; color: #FFFFFF; font-weight: bold; border-radius: 5px; padding: 10px 20px; text-decoration: none; text-align: center; font-size: 14px; margin-top: 10px;">CONFIRM EMAIL</a>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin-top: 20px;">If you have any questions, our support team is just an email away.</p>
          <p style="font-family: 'Work Sans', Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 25.6px; color: #666666; margin: 0;">Happy expansion,<br />The ZainSpot Team</p>
        </div>
        <div style="background-color: #E8E8E8; padding: 10px; margin-top: 20px; border-radius: 8px;">
          <h1 style="font-size: 16px;">ZainSpot, Inc.</h1>
          <div style="display: flex; justify-content: space-between;">
            <img src="https://example.com/path/to/your/logo.png" alt="Logo" style="max-width: 50px; height: auto;" />
            <div style="display: flex; gap: 8px;">
              <!-- Social icons can go here -->
            </div>
          </div>
          <p style="color: #666666; font-size: 14px;">
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
