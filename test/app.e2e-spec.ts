import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Successful case', async () => {
    const mockUser = {
      email: 'yehor.khilchenko@gmail.com',
      marketingData: ['marketing data 1', 'marketing data 2'],
    };
    const mockOffer = {
      name: 'offer1',
      price: 12.12,
    };

    const server = app.getHttpServer();

    const createdUser = await request(server).post('/users').send(mockUser);

    expect(createdUser.status).toEqual(201);

    const createdOffer = await request(server).post('/offers').send(mockOffer);

    expect(createdOffer.status).toEqual(201);

    const createdPurchase = await request(server)
      .post('/offers/purchase')
      .send({
        offerId: createdOffer.body.id,
        userId: createdUser.body.id,
      });

    expect(createdPurchase.status).toEqual(201);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await server.close();
  });
});
