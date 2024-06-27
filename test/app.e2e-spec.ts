import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('POST /user', () => {
    const createUserDto = {
      name: 'Henrique Gomes',
      document: '47854733805',
      password: 'Teste@123',
      email: 'heenrique@example.com',
      phone: '+5511999139204',
      birthday: '2006-05-26',
      address: {
        city: 'São Paulo',
        state: 'São Paulo',
        street: '123 Main St',
        postalCode: '94105',
        number: '101',
        complement: 'Apt 3B',
        neighborhood: 'Downtown',
      },
    };

    return request(app.getHttpServer()).post('/user').send(createUserDto).expect(201); // Assuming the endpoint should return 201 for successful user creation
  });

  it('POST /user should return 400 when the user already exists', () => {
    const createUserDto = {
      name: 'Henrique Gomes',
      document: '43616270880',
      password: 'Teste@123',
      email: 'heenrique@example.com',
      phone: '+5511999139204',
      birthday: '2006-05-26',
      address: {
        city: 'São Paulo',
        state: 'São Paulo',
        street: '123 Main St',
        postalCode: '94105',
        number: '101',
        complement: 'Apt 3B',
        neighborhood: 'Downtown',
      },
    };

    return request(app.getHttpServer()).post('/user').send(createUserDto).expect(400); // Assuming the endpoint should return 201 for successful user creation
  });

  afterAll(() => {
    app.close();
  });
});
