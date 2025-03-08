import { BadRequestException } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { VehicleSize, VehicleType } from '../../common/enum';

class PriceItem {
  @IsNumber()
  earning_points: number;

  @IsNumber()
  points: number;

  @IsNumber()
  @Min(1)
  price: number;

  @IsEnum(VehicleSize, {
    message: `size must be one of: ${Object.values(VehicleSize).join(', ')}`,
  })
  size: VehicleSize;
}

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(VehicleType)
  type: VehicleType;

  @IsString()
  image: string;

  @IsNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      value = JSON.parse(value) as PriceItem[];
    }

    if (!Array.isArray(value)) {
      throw new BadRequestException('price_list must be a valid JSON array');
    }

    // ✅ Validate Each Object to Match PriceItem Format
    value.forEach((item: PriceItem) => {
      if (
        typeof item.earning_points !== 'number' ||
        typeof item.points !== 'number' ||
        typeof item.price !== 'number' ||
        typeof item.size !== 'string'
      ) {
        throw new BadRequestException(
          'Each item in price_list must match PriceItem format',
        );
      }
    });

    return value as PriceItem[];
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceItem)
  price_list: PriceItem[];
}
