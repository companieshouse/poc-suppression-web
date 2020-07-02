import { Test, TestingModule } from '@nestjs/testing';
import { TemplateConstantProviderService } from './template-constant-provider.service';

describe('TemplateConstantProviderService', () => {
  let service: TemplateConstantProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateConstantProviderService],
    }).compile();

    service = module.get<TemplateConstantProviderService>(TemplateConstantProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
