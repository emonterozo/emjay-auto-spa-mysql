import { BadRequestException } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsString, Min } from 'class-validator';

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class OrderByDto {
  @IsString()
  field: string;

  @IsEnum(OrderDirection, { message: 'direction must be "asc" or "desc"' })
  direction: OrderDirection;
}

export class PaginationDto {
  @Type(() => Number)
  @IsInt({ message: 'limit must be an integer' })
  @Min(1, { message: 'limit must be at least 1' })
  limit: number;

  @Type(() => Number)
  @IsInt({ message: 'offset must be an integer' })
  @Min(0, { message: 'offset must be at least 0' })
  offset: number;

  @Transform(
    ({ value }) => {
      try {
        const obj: unknown = JSON.parse(value as string);

        if (
          obj &&
          typeof obj === 'object' &&
          'field' in obj &&
          'direction' in obj &&
          Object.values(OrderDirection).includes(
            obj.direction as OrderDirection,
          )
        ) {
          return obj;
        }

        throw new Error();
      } catch {
        throw new BadRequestException(
          'order_by must be a valid JSON object with "field" (string) and "direction" ("asc" or "desc")',
        );
      }
    },
    { toClassOnly: true },
  )
  order_by: OrderByDto;
}
