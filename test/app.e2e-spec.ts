import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

let app: INestApplication;
beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(() => {
  app.close();
});

describe('Root route controller (e2e)', () => {
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(HttpStatus.NOT_FOUND);
  });
});

describe('Domain route controller (e2e)', () => {
  it('/api/domain/1 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/domain/1')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('/api/domain (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/domain')
      .send({
        name: 'Web Development',
        logo: 'src/logos/web-development.png',
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });
});

describe('Auth route controller (e2e)', () => {
  it('/api/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        username: 'wrong username',
        password: 'some password',
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });
});

describe('Certificate route controller (e2e)', () => {
  it('/api/certificate (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/certificate')
      .expect(HttpStatus.OK);
  });
});

describe('Hobby route controller (e2e)', () => {
  it('/api/hobby/1 (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/hobby/1')
      .expect(HttpStatus.NOT_FOUND);
  });
  it('/api/hobby (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/hobby')
      .expect(HttpStatus.UNAUTHORIZED);
  });
});

describe('Project route controller (e2e)', () => {
  it('/api/project (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/project')
      .expect(HttpStatus.OK);
  });
});

describe('Resume route controller (e2e)', () => {
  it('/api/resume (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/resume')
      .expect(HttpStatus.OK);
  });
});

describe('Section route controller (e2e)', () => {
  it('/api/section/1 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/section/1')
      .expect(HttpStatus.UNAUTHORIZED);
  });
});

describe('Technology route controller (e2e)', () => {
  it('/api/technology (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/technology/1')
      .expect(HttpStatus.UNAUTHORIZED);
  });
});
