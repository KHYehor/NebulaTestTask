import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './offers.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { OffersService } from './offers.service';
import { OffersRepository } from './repositories/offers.repository';
import { PurchaseRepository } from './repositories/purchase.repository';
import { ScheduleModule } from '@nestjs/schedule';

describe('OffersController', () => {
  let controller: OffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule,
        UsersModule,
        AnalyticsModule,
        ScheduleModule.forRoot(),
      ],
      providers: [OffersService, OffersRepository, PurchaseRepository],
      controllers: [OffersController],
    }).compile();

    controller = module.get<OffersController>(OffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
