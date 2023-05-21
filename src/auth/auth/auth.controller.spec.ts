import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn((x) => {
              if (x.username == 'Mock User' && x.password == 'Mock Password') {
                return {
                  access_token: 'Mock Access Token',
                };
              } else {
                throw new UnauthorizedException();
              }
            }),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call the service signin method', async () => {
      const signIn = jest.spyOn(service, 'signIn');
      const token = await controller.signIn({
        username: 'Mock User',
        password: 'Mock Password',
      });

      expect(signIn).toHaveBeenCalled();
      expect(token).toEqual({ access_token: 'Mock Access Token' });
    });

    it('should return unauthorized if credentials are invalid', async () => {
      const signIn = jest.spyOn(service, 'signIn');
      let token;

      try {
        token = await controller.signIn({
          username: 'Mock User',
          password: 'Wrong Password',
        });
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException());
      }
      expect(signIn).toHaveBeenCalled();
      expect(token).toBe(undefined);
    });
  });
});
