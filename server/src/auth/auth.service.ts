import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';
import EmailService from 'src/email/email.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private emailService: EmailService,
	) { }

	async signIn(authLoginDto: AuthLoginDto) {
		const user = await this.validateUser(authLoginDto);

		// Check if the user has email authentication enabled
		if (user.EmailAuthentication) {
			const code = this.generateRandomCode();
			await this.sendTwoFactorCode(user.email, code);
			await this.userService.storeTwoFactorCode(user.id, code);
			return {
				message: '2FA code sent to your email.',
				require2FA: true,
			};
		}

		// Proceed with JWT token generation if 2FA is not required
		const payload = {
			userId: user.id,
			email: user.email,
			role: user.role,
			preferedLanguage: user.preferedLanguage,
			preferedCurrency: user.preferedCurrency,
		};
		const token = this.jwtService.sign(payload, { expiresIn: '14400s' });
		const decodedToken = this.jwtService.decode(token) as { exp: number };

		return {
			user: payload,
			access_token: token,
			expires_at: new Date(decodedToken.exp * 1000),
		};
	}

	async validateUser(authLoginDto: AuthLoginDto) {
		const { email, password } = authLoginDto;

		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new UnauthorizedException();
		}

		if (!(await user?.validatePassword(password))) {
			throw new UnauthorizedException('Incorrect Password! Please Try Again');
		}

		if (!user.activation) {
			throw new UnauthorizedException('Your account has been deactivated. Please contact support for further assistance.');
		}

		delete user.password;

		return user;
	}

	private generateRandomCode(): string {
		return crypto.randomInt(100000, 999999).toString();
	}

	private async sendTwoFactorCode(email: string, code: string) {
		const html = `
		<div>
			<h1>Your 2FA Code</h1>
			<p>Your verification code is: <strong>${code}</strong></p>
			<p>Please enter this code to complete your login.</p>
		</div>
		`;

		await this.emailService.sendMail({
			to: email,
			subject: "Your 2FA Code",
			html,
		});
	}

	async verifyTwoFactorCode(email: string, code: string): Promise<boolean> {
		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new UnauthorizedException('User not found');
		}

		const storedCode = await this.userService.getTwoFactorCode(user.id);
		console.log('Stored Code:', storedCode);
		console.log('Input Code:', code);
		console.log('Code Expiration:', user.twoFactorCodeExpiresAt);

		if (!storedCode || storedCode !== code) {
			throw new UnauthorizedException('Invalid 2FA code. Please try again.');
		}

		// Clear the code after successful verification
		await this.userService.clearTwoFactorCode(user.id);
		return true;
	}
}