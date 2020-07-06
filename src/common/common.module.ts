import { Module } from '@nestjs/common';
import { TemplateConstantProviderService } from './services/template-constant-provider/template-constant-provider.service';
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
      }),
    }),
  ],
  providers: [TemplateConstantProviderService],
  exports: [TemplateConstantProviderService],
})
export class CommonModule {}
