import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { AnalyticsService } from './analytics/analytics.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UsersModule,
    OffersModule,
    AnalyticsModule,
    HttpModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
    }),
  ],
  providers: [AnalyticsService],
})
export class AppModule {}
