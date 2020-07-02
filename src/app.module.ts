import { Module } from '@nestjs/common';
import { SuppressionsModule } from 'app/suppressions/suppressions.module';

@Module({
  imports: [SuppressionsModule],
})
export class AppModule {}
