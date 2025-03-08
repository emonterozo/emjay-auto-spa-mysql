import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { ServicesModule } from './service/services.module';
import { EmployeesModule } from './employee/employees.module';
import { ExpensesModule } from './expense/expenses.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ServicesModule,
    EmployeesModule,
    ExpensesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
