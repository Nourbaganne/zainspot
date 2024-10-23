import { Test, TestingModule } from '@nestjs/testing';
import { GoldMemberEmailController } from './gold-member-email.controller';

describe('GoldMemberEmailController', () => {
  let controller: GoldMemberEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoldMemberEmailController],
    }).compile();

    controller = module.get<GoldMemberEmailController>(GoldMemberEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
