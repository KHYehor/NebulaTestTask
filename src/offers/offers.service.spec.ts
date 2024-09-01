import { Test, TestingModule } from '@nestjs/testing';
import { OffersService } from './offers.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OffersRepository } from './repositories/offers.repository';
import { PurchaseRepository } from './repositories/purchase.repository';
import { OffersController } from './offers.controller';

describe('OffersService', () => {
  let service: OffersService;

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

    service = module.get<OffersService>(OffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
