import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { AvailedService } from './entities/availed-service.entity';
import {
  AvailedServiceStatus,
  ServiceCharge,
  TransactionStatus,
} from '../common/enum';
import { CreateAvailedServiceDto } from './dto/create-availed-service.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(AvailedService)
    private readonly availedServiceRepository: Repository<AvailedService>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create(createTransactionDto);
    const result = await this.transactionRepository.save(transaction);

    const isFree =
      createTransactionDto.service_charge === ServiceCharge['FREE'];

    await this.availedServiceRepository.save({
      price: createTransactionDto.price,
      discount: isFree ? createTransactionDto.price : 0,
      company_earnings: Math.max(
        0,
        createTransactionDto.price * 0.6 -
          (isFree ? createTransactionDto.price : 0),
      ),
      employee_share: createTransactionDto.price * 0.4,
      is_free: isFree,
      is_paid: isFree,
      service: { id: createTransactionDto.service_id },
      transaction: { id: result.id },
    });

    return result;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      select: ['status'],
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    if (transaction.status === updateTransactionDto.status)
      throw new BadRequestException('No changes detected');

    const availedServices = await this.availedServiceRepository.find({
      where: { transaction: { id } },
      select: ['status'],
    });

    const statuses = availedServices.map((item) => item.status);

    if (updateTransactionDto.status === TransactionStatus['COMPLETED']) {
      const hasPendingOrOngoing = statuses.some((status) =>
        [AvailedServiceStatus.PENDING, AvailedServiceStatus.ONGOING].includes(
          status,
        ),
      );

      if (hasPendingOrOngoing)
        throw new BadRequestException(
          'Update not allowed. Make sure availed services has no Pending or Ongoing statuses',
        );

      if (transaction.status === TransactionStatus['CANCELLED'])
        throw new BadRequestException(
          'Update not allowed. Already cancelled transaction cannot be updated',
        );

      await this.transactionRepository.update(
        { id },
        { status: TransactionStatus['COMPLETED'], check_out: new Date() },
      );

      return { transaction: id };
    } else if (updateTransactionDto.status === TransactionStatus['CANCELLED']) {
      const hasOngoingOrDone = statuses.some((status) =>
        [AvailedServiceStatus.ONGOING, AvailedServiceStatus.DONE].includes(
          status,
        ),
      );

      if (hasOngoingOrDone)
        throw new BadRequestException(
          'Update not allowed. Make sure availed services has no Ongoing or Done statuses',
        );

      await this.availedServiceRepository.update(
        { transaction: { id } },
        {
          discount: 0,
          deduction: 0,
          company_earnings: 0,
          employee_share: 0,
          is_free: false,
          is_paid: false,
          status: AvailedServiceStatus['CANCELLED'],
        },
      );

      await this.transactionRepository.update(
        { id },
        { status: TransactionStatus['CANCELLED'], check_out: new Date() },
      );

      return { transaction: id };
    }
  }

  async createAvailedService(
    id: number,
    createAvailedServiceDto: CreateAvailedServiceDto,
  ) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    // check if service already exist
    const availedService = await this.availedServiceRepository.findOne({
      where: {
        transaction: { id },
        service: { id: createAvailedServiceDto.service_id },
      },
    });

    if (availedService)
      throw new BadRequestException('Service already exist in transaction');

    const isFree =
      createAvailedServiceDto.service_charge === ServiceCharge['FREE'];

    return await this.availedServiceRepository.save({
      price: createAvailedServiceDto.price,
      discount: isFree ? createAvailedServiceDto.price : 0,
      company_earnings: Math.max(
        0,
        createAvailedServiceDto.price * 0.6 -
          (isFree ? createAvailedServiceDto.price : 0),
      ),
      employee_share: createAvailedServiceDto.price * 0.4,
      is_free: isFree,
      is_paid: isFree,
      service: { id: createAvailedServiceDto.service_id },
      transaction: { id },
    });
  }
}
