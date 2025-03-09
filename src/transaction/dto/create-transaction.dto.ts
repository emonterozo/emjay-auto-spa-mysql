import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import {
  ServiceCharge,
  TransactionStatus,
  VehicleSize,
  VehicleType,
} from '../../common/enum';
import { IsValidPhoneNumber } from '../../common/validator/is-valid-phone-number.validator';

export class CreateTransactionDto {
  @IsEnum(VehicleType)
  vehicle_type: VehicleType;

  @IsEnum(VehicleSize)
  vehicle_size: VehicleSize;

  @IsString()
  model: string;

  @IsString()
  plate_number: string;

  @IsOptional()
  @IsString()
  @Validate(IsValidPhoneNumber)
  contact_number?: string;

  @IsNumber()
  service_id: number;

  @IsNumber()
  price: number;

  @IsEnum(ServiceCharge)
  service_charge: ServiceCharge;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
