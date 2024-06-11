import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export default class DiscountInterface {
  @ApiProperty({
    type: 'number',
  })
  @IsInt()
  quantity: number;

  @ApiProperty({
    type: 'number',
  })
  @IsInt()
  percent: number;
  //[key: string]: number;
}
