import { Test, TestingModule } from '@nestjs/testing';
import { TelnyxController } from './telnyx.controller';

describe('TelnyxController', () => {
  let controller: TelnyxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelnyxController],
    }).compile();

    controller = module.get<TelnyxController>(TelnyxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
