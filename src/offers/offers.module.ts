import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { OffersRepository } from './repositories/offers.repository';
import { PurchaseRepository } from './repositories/purchase.repository';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [HttpModule, ConfigModule, UsersModule, AnalyticsModule],
  providers: [OffersService, OffersRepository, PurchaseRepository],
  controllers: [OffersController],
  exports: [OffersService, OffersRepository, PurchaseRepository],
})
export class OffersModule {}
