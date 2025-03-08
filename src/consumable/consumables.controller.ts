import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ConsumablesService } from './consumables.service';
import { CreateConsumableDto } from './dto/create-consumable.dto';
import { UpdateConsumableDto } from './dto/update-consumable.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('consumables')
export class ConsumablesController {
  constructor(private readonly consumablesService: ConsumablesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body(ValidationPipe) createConsumableDto: CreateConsumableDto) {
    return this.consumablesService.create(createConsumableDto);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true }))
    paginationDto: PaginationDto,
  ) {
    return this.consumablesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumablesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsumableDto: UpdateConsumableDto,
  ) {
    return this.consumablesService.update(+id, updateConsumableDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.consumablesService.remove(+id);
  }
}
