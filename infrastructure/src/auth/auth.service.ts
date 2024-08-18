import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      user: payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;

    const visitor = await this.userService.findByEmail(email);
    if (!visitor) {
      throw new UnauthorizedException();
    }
    if (!(await visitor?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    delete visitor.password;

    return visitor;
  }
}
