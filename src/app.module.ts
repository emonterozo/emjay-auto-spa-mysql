import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { ConsumableModule } from './consumable/consumable.module';
import { EmployeeModule } from './employee/employee.module';
import { ExpenseModule } from './expense/expense.module';
import { ServiceModule } from './service/service.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ConsumableModule,
    EmployeeModule,
    ExpenseModule,
    ServiceModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
