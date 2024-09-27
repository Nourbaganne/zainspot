import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) { }

	async signIn(authLoginDto: AuthLoginDto) {
		const user = await this.validateUser(authLoginDto);

		const payload = {
			userId: user.id,
			email: user.email,
			role: user.role,
		};

		  // Sign the JWT and get the expiration time from the token
			const token = this.jwtService.sign(payload, { expiresIn: '14400s' });

			// Decode the token to get the expiration time (exp)
			const decodedToken = this.jwtService.decode(token) as { exp: number };
			console.log("decodedtoken", decodedToken);
			

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

		delete user.password;

		return user;

	}
}
