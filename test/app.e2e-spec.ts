import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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
    return request(app.getHttpServer()).get('/').expect(404);
  });
});

describe('Domain route controller (e2e)', () => {
  it('/api/domain/1 (DELETE)', () => {
    return request(app.getHttpServer()).delete('/api/domain/1').expect(401);
  });

  it('/api/domain (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/domain')
      .send({
        name: 'Web Development',
        logo: 'src/logos/web-development.png',
      })
      .expect(401);
  });
});
