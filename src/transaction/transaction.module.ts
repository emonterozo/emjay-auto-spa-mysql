import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { AvailedService } from './entities/availed-service.entity';
import { Employee } from '../employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, AvailedService, Employee])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
