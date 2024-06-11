import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import DiscountInterface from '../interface/discount.interface';

export class CreateProductDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  product_id_1C: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  tags: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  category_id: string;

  @ApiProperty({
    type: [String],
  })
  @IsArray()
  images: string[];

  @ApiProperty({
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    required: false,
    type: [DiscountInterface],
  })
  @IsArray()
  discounts: DiscountInterface[];
}
