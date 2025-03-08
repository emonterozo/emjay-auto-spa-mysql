import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { ServiceModule } from './service/services.module';
import { EmployeeModule } from './employee/employees.module';
import { ExpenseModule } from './expense/expenses.module';
import { ConsumableModule } from './consumable/consumables.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ServiceModule,
    EmployeeModule,
    ExpenseModule,
    ConsumableModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
