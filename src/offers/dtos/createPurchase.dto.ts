import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  @Min(0)
  public offerId: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  @Min(0)
  public userId: number;
}
