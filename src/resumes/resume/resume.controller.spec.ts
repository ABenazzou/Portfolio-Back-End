import { Test, TestingModule } from '@nestjs/testing';
import { ResumeController } from './resume.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResumeService } from './resume.service';

describe('ResumeController', () => {
  let controller: ResumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        ConfigService,
        {
          provide: ResumeService,
          useValue: {
            getResumes: jest.fn(),
            getResumeById: jest.fn(),
            createResume: jest.fn(),
            updateResume: jest.fn(),
            deleteResume: jest.fn(),
            setResumeDomain: jest.fn(),
          },
        },
      ],
      controllers: [ResumeController],
    }).compile();

    controller = module.get<ResumeController>(ResumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
