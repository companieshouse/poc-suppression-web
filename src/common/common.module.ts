import { Module } from '@nestjs/common';
import { TemplateConstantProviderService } from 'app/common/services/template-constant-provider/template-constant-provider.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        GOV_PAY_URL: Joi.string().required(),
        NODE_ENV: Joi.string()
          .required()
          .valid('dev', 'prod', 'test'),
        CACHE_SERVER: Joi.string().required(),
        CACHE_DB: Joi.string().required(),
        CACHE_PASSWORD: Joi.string().allow(''),
        COOKIE_NAME: Joi.string().required(),
        COOKIE_DOMAIN: Joi.string().required(),
        COOKIE_SECURE_ONLY: Joi.boolean().required(),
        COOKIE_SECRET: Joi.string().required(),
        DEFAULT_SESSION_EXPIRATION: Joi.string().required(),
      }),
    }),
  ],
  providers: [TemplateConstantProviderService],
  exports: [TemplateConstantProviderService],
})
export class CommonModule {}
