import { Test, TestingModule } from '@nestjs/testing';
import { ConsumableService } from './consumable.service';

describe('ConsumableService', () => {
  let service: ConsumableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumableService],
    }).compile();

    service = module.get<ConsumableService>(ConsumableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
