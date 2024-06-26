import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      JwtStrategy: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      SecretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { userId: number }) {
    return {
      userId: payload.userId,
    };
  }
}
