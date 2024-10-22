import { Test, TestingModule } from '@nestjs/testing';
import { GoldMemberEmailService } from './gold-member-email.service';

describe('GoldMemberEmailService', () => {
  let service: GoldMemberEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoldMemberEmailService],
    }).compile();

    service = module.get<GoldMemberEmailService>(GoldMemberEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
