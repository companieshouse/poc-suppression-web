import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { SuppressionsModule } from './suppressions/suppressions.module';

@Module({
  imports: [SuppressionsModule]
})
export class AppModule { }
