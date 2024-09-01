import { IsNumber, IsString, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty({
    example: 'offer1',
    required: true,
  })
  @IsString()
  @Length(4)
  public name: string;

  @ApiProperty({
    example: 12.12,
    required: true,
  })
  @IsNumber()
  @Min(1)
  public price: number;
}
