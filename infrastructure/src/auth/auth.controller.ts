import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    try {
      return this.authService.signIn(authLoginDto);
    } catch (error) {
      console.log('error', error);
    }
  }

  @Get()
  async test() {
    return 'success login';
  }
}
