import { ObjectLiteral, Repository } from 'typeorm';
import { OrderByDto } from '../dto/pagination.dto';

/**
 * Validates and applies sorting dynamically for a repository.
 * @param repository - The TypeORM repository.
 * @param orderBy - The sorting field and direction.
 * @param defaultField - The fallback sorting field (optional).
 * @returns A valid order clause for TypeORM queries.
 */
export function getValidOrder<T extends ObjectLiteral>(
  repository: Repository<T>,
  orderBy?: OrderByDto,
): Record<string, OrderByDto['direction']> | undefined {
  const entityMetadata = repository.metadata;
  const validFields = entityMetadata.columns.map((col) => col.propertyName);

  const orderField = orderBy?.field;
  const orderDirection =
    orderBy?.direction?.toUpperCase() as OrderByDto['direction'];

  return orderField && validFields.includes(orderField)
    ? { [orderField]: orderDirection }
    : undefined;
}
