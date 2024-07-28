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
  ) {}

  public async sendVerificationLink(email: string): Promise<void> {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`
    });
  
    const frontendUrl = `${process.env.FRONTEND_URL}/email-confirmation?token=${token}`;
    const text = `Welcome to the Zainspott application. To confirm your email address, please click here: ${frontendUrl}`;
  
    try {
      await this.emailService.sendMail({
        to: email,
        subject: 'Email confirmation',
        text,
      });
      this.logger.log(`Verification email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${email}`, error.stack);
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
