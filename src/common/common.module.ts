import { Module } from '@nestjs/common';
import { TemplateConstantProviderService } from './services/template-constant-provider/template-constant-provider.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  })],
  providers: [TemplateConstantProviderService],
  exports: [TemplateConstantProviderService]
})
export class CommonModule { }
