import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'app/app.module';
import { LANDING_PAGE_URI } from 'app/common/routes/routes.constants';
import { CommonModule } from 'app/common/common.module';
import { TemplateConstantProviderService } from 'app/common/services/template-constant-provider/template-constant-provider.service';
import { configNestExpressApp } from 'app/app.config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CommonModule],
      providers: [TemplateConstantProviderService],
    }).compile();

    app = configNestExpressApp(moduleFixture.createNestApplication());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });

  it('/suppress-my-details (GET) ', () => {
    const templateConstants = app.get(TemplateConstantProviderService).getServiceConstants();
    return request(app.getHttpServer())
      .get(LANDING_PAGE_URI)
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.text).toContain(templateConstants.serviceName);
      });
  });
});
