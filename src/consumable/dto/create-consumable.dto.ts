import { IsNumber, IsString, Min } from 'class-validator';

import { IsValidDate } from '../../common/decorator/is-valid-date.decorator';

export class CreateConsumableDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsString()
  @IsValidDate('date')
  date: string;
}
