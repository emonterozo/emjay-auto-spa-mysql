import { Module } from '@nestjs/common';

import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { PriceList } from './entities/price-list.entity';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, PriceList, Review])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
