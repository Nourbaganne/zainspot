import { Test, TestingModule } from '@nestjs/testing';
import { SupportController } from './chat.controller';

describe('SupportController', () => {
  let controller: SupportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportController],
    }).compile();

    controller = module.get<SupportController>(SupportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
