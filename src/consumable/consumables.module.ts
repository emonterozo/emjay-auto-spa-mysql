import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConsumablesService } from './consumables.service';
import { ConsumablesController } from './consumables.controller';
import { Consumable } from './entities/consumable.entity';
import { Expense } from '../expense/entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consumable, Expense])],
  controllers: [ConsumablesController],
  providers: [ConsumablesService],
})
export class ConsumableModule {}
