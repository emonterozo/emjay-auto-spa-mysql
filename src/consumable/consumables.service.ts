import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateConsumableDto } from './dto/create-consumable.dto';
import { UpdateConsumableDto } from './dto/update-consumable.dto';
import { Consumable } from './entities/consumable.entity';
import { Expense } from '../expense/entities/expense.entity';
import { ExpenseCategory } from '../common/enum';
import { PaginationDto } from '../common/dto/pagination.dto';
import { getValidOrder } from '../common/utils/sort.util';

@Injectable()
export class ConsumablesService {
  constructor(
    @InjectRepository(Consumable)
    private readonly consumableRepository: Repository<Consumable>,

    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}
  async create(createConsumableDto: CreateConsumableDto) {
    const consumable = this.consumableRepository.create(createConsumableDto);
    const result = await this.consumableRepository.save(consumable);

    const expense = this.expenseRepository.create({
      category: ExpenseCategory.CONSUMABLES,
      description: `Purchased ${createConsumableDto.name}`,
      amount: createConsumableDto.price * createConsumableDto.quantity,
      date: createConsumableDto.date,
    });

    await this.expenseRepository.save(expense);

    return result;
  }

  async findAll(paginationDto: PaginationDto) {
    const orderClause = getValidOrder(
      this.consumableRepository,
      paginationDto.order_by,
    );

    const [data, total] = await this.consumableRepository.findAndCount({
      take: paginationDto.limit,
      skip: paginationDto.offset,
      order: orderClause,
    });

    return { data, total };
  }

  async findOne(id: number) {
    const consumable = await this.consumableRepository.findOne({
      where: { id },
    });

    if (!consumable) throw new NotFoundException('Consumable not found');

    return consumable;
  }

  async update(id: number, updateConsumableDto: UpdateConsumableDto) {
    const consumable = await this.consumableRepository.preload({
      id,
      ...updateConsumableDto,
    });

    if (!consumable) throw new NotFoundException('Consumable not found');

    return await this.consumableRepository.save(consumable);
  }

  async remove(id: number) {
    const result = await this.consumableRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('Consumable not found');
  }
}
