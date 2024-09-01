import { IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OfferDto {
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  public id: number;

  @ApiProperty({
    example: 'offer1',
    required: true,
  })
  @IsString()
  public name: string;

  @ApiProperty({
    example: 12.12,
    required: true,
  })
  @IsNumber()
  @Min(1)
  public price: number;
}
