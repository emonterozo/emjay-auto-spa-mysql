import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create(createServiceDto);
    return await this.serviceRepository.save(service);
  }

  async findAll(paginationDto: PaginationDto) {
    const [data, total] = await this.serviceRepository.findAndCount({
      relations: ['price_list'],
      take: paginationDto.limit,
      skip: paginationDto.offset,
      order: paginationDto.order_by?.field
        ? {
            [paginationDto.order_by.field]:
              paginationDto.order_by.direction.toUpperCase(),
          }
        : undefined,
    });

    return { data, total };
  }

  async findOne(id: number) {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: ['price_list'],
    });

    if (!service) throw new NotFoundException('Service not found');

    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepository.preload({
      id,
      ...updateServiceDto,
    });

    if (!service) throw new NotFoundException('Service not found');

    return await this.serviceRepository.save(service);
  }

  async remove(id: number) {
    const result = await this.serviceRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException('Service not found');
  }
}
