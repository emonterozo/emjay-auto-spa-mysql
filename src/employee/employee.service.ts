import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { getValidOrder } from '../common/utils/sort.util';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return await this.employeeRepository.save(employee);
  }

  async findAll(paginationDto: PaginationDto) {
    const orderClause = getValidOrder(
      this.employeeRepository,
      paginationDto.order_by,
    );

    const [data, total] = await this.employeeRepository.findAndCount({
      take: paginationDto.limit,
      skip: paginationDto.offset,
      order: orderClause,
    });

    return { data, total };
  }

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { id } });

    if (!employee) throw new NotFoundException('Employee not found');

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const service = await this.employeeRepository.preload({
      id,
      ...updateEmployeeDto,
    });

    if (!service) throw new NotFoundException('Employee not found');

    return await this.employeeRepository.save(service);
  }

  async remove(id: number) {
    const result = await this.employeeRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('Employee not found');
  }
}
