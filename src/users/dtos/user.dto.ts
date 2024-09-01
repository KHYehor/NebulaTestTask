import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 1,
    required: true,
  })
  public id: number;

  @ApiProperty({
    example: 'yehor.khilchenko@gmail.com',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: ['marketing data 1', 'marketing data 2'],
    required: true,
  })
  public marketingData: string[];
}
