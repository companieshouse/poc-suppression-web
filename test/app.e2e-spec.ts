import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NestMiddleware } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'app/app.module';
import { LANDING_PAGE_URI } from 'app/common/routes/routes.constants';
import { CommonModule } from 'app/common/common.module';
import { TemplateConstantProviderService } from 'app/common/services/template-constant-provider/template-constant-provider.service';
import { configNestExpressApp } from 'app/app.config';
import { SessionMiddleware } from 'ch-node-session-handler';
import { LandingController } from 'app/suppressions/landing/landing.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [TemplateConstantProviderService],
      controllers: [LandingController],
    }).compile();

    app = configNestExpressApp(moduleFixture.createNestApplication());
    await app.init();
  });

  it('/ (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/')
      .expect(404);
  });

  it('/suppress-my-details (GET) ', async () => {
    const templateConstants = app.get(TemplateConstantProviderService).getServiceConstants();
    return await request(app.getHttpServer())
      .get(LANDING_PAGE_URI)
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.text).toContain(templateConstants.serviceName);
      });
  });
});
