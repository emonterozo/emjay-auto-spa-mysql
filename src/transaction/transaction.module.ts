import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { AvailedService } from './entities/availed-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, AvailedService])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
