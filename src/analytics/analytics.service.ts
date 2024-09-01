import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public saveReport(): void {
    setImmediate(async () => {
      try {
        const { data } = await lastValueFrom(
          this.httpService.post(this.configService.get('MOCK_URL'), {}),
        );
        console.info(`Report saved data: ${data}`);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
