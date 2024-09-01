import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseDto {
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  public id: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  public offerId: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  public userId: number;
}
