import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateAvailedServiceDto } from './dto/create-availed-service.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UpdateAvailedServiceDto } from './dto/update-availed-service.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body(ValidationPipe) createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Post(':id/availed_services')
  @UsePipes(new ValidationPipe({ transform: true }))
  createAvailedService(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) createAvailedServiceDto: CreateAvailedServiceDto,
  ) {
    return this.transactionService.createAvailedService(
      id,
      createAvailedServiceDto,
    );
  }

  @Patch(':transaction_id/availed_services/:availed_service_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateAvailedService(
    @Param('transaction_id', ParseIntPipe) transaction_id: number,
    @Param('availed_service_id', ParseIntPipe) availed_service_id: number,
    @Body(ValidationPipe) updateAvailedServiceDto: UpdateAvailedServiceDto,
  ) {
    return this.transactionService.updateAvailedService(
      transaction_id,
      availed_service_id,
      updateAvailedServiceDto,
    );
  }
}
