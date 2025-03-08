import { IsEnum, IsNumber, IsString, Min } from 'class-validator';

import { ExpenseCategory } from '../../common/enum';
import { IsValidDate } from '../../common/decorator/is-valid-date.decorator';

export class CreateExpenseDto {
  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @IsValidDate('date')
  date: string;
}
