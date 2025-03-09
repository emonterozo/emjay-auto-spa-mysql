import { Module } from '@nestjs/common';
import { ConsumableService } from './consumable.service';
import { ConsumableController } from './consumable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumable } from './entities/consumable.entity';
import { Expense } from '../expense/entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consumable, Expense])],
  controllers: [ConsumableController],
  providers: [ConsumableService],
})
export class ConsumableModule {}
