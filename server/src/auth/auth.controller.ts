import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Public } from 'src/decorators/public.decorator';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) { }

  @Public()
  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    try {
      return this.authService.signIn(authLoginDto);
    } catch (error) {
      console.log('error', error);
    }
  }

  @Public()
  @Post('verify-2fa')
  async verifyTwoFactor(@Body() body: { email: string; code: string }) {
    const { email, code } = body;
    try {
      await this.authService.verifyTwoFactorCode(email, code);
      // Generate a JWT token or any other success response
      const user = await this.userService.findByEmail(email); // Get user details

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
    } catch (error) {
      console.log('2FA verification error:', error);
      throw new HttpException('Invalid 2FA code. Please try again.', HttpStatus.UNAUTHORIZED);
    }
  }


  @Get()
  async test() {
    return 'success login';
  }

}
