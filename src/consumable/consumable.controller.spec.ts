import { Test, TestingModule } from '@nestjs/testing';
import { ConsumableController } from './consumable.controller';
import { ConsumableService } from './consumable.service';

describe('ConsumableController', () => {
  let controller: ConsumableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumableController],
      providers: [ConsumableService],
    }).compile();

    controller = module.get<ConsumableController>(ConsumableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
