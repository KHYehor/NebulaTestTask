import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'yehor.khilchenko@gmail.com',
    required: true,
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: ['marketing data 1', 'marketing data 2'],
    required: true,
  })
  @IsString({ each: true })
  @IsNotEmpty()
  public marketingData: string[];
}
