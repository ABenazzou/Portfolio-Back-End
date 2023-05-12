import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    jwtService = new JwtService();
    configService = new ConfigService();
    authGuard = new AuthGuard(jwtService, configService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
