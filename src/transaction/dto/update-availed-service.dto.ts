import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { AvailedServiceStatus } from '../../common/enum';

export class UpdateAvailedServiceDto {
  @IsNumber()
  discount: number;

  @IsNumber()
  deduction: number;

  @IsBoolean()
  is_free: boolean;

  @IsBoolean()
  is_paid: boolean;

  @IsEnum(AvailedServiceStatus)
  status: AvailedServiceStatus;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayUnique()
  @ArrayNotEmpty()
  assigned_employees: number[];
}
