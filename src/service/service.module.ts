import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './entities/service.entity';
import { PriceList } from './entities/price-list.entity';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, PriceList, Review])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
