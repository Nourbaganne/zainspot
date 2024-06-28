import { JwtService } from '@nestjs/jwt';
import { VisitorService } from './../visitor/visitor.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private visitorService: VisitorService,
    private jwtService: JwtService,
  ) {}

  async signIn(authLoginDto: AuthLoginDto) {
    const visitor = await this.validateVisitor(authLoginDto);

    const payload = {
      userId: visitor.id,
    };

    return {
      statusCode: 200,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateVisitor(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;

    const visitor = await this.visitorService.findByEmail(email);
    if (!(await visitor?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    delete visitor.password;

    return visitor;
  }
}
