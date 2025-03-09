import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { getValidOrder } from '../common/utils/sort.util';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const expense = this.expenseRepository.create(createExpenseDto);
    return await this.expenseRepository.save(expense);
  }

  async findAll(paginationDto: PaginationDto) {
    const orderClause = getValidOrder(
      this.expenseRepository,
      paginationDto.order_by,
    );

    const [data, total] = await this.expenseRepository.findAndCount({
      take: paginationDto.limit,
      skip: paginationDto.offset,
      order: orderClause,
    });

    return { data, total };
  }

  async findOne(id: number) {
    const expense = await this.expenseRepository.findOne({ where: { id } });

    if (!expense) throw new NotFoundException('Expense not found');

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.expenseRepository.preload({
      id,
      ...updateExpenseDto,
    });

    if (!expense) throw new NotFoundException('Expense not found');

    return await this.expenseRepository.save(expense);
  }

  async remove(id: number) {
    const result = await this.expenseRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException('Expense not found');
  }
}
