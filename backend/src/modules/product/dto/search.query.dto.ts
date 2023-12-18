import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: 'string',
  })
  name: string;
}
