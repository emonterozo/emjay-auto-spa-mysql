import { IsEnum, IsNumber } from 'class-validator';
import { ServiceCharge } from '../../common/enum';

export class CreateAvailedServiceDto {
  @IsNumber()
  service_id: number;

  @IsNumber()
  price: number;

  @IsEnum(ServiceCharge)
  service_charge: ServiceCharge;
}
