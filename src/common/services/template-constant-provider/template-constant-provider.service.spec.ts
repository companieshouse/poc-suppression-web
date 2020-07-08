import { Test, TestingModule } from '@nestjs/testing';
import { TemplateConstantProviderService } from './template-constant-provider.service';
import { CommonModule } from 'app/common/common.module';

describe('TemplateConstantProviderService', () => {
  let service: TemplateConstantProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [TemplateConstantProviderService],
    }).compile();

    service = module.get<TemplateConstantProviderService>(TemplateConstantProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
