import { Module } from '@nestjs/common';
import { SuppressionsModule } from 'app/suppressions/suppressions.module';

export const APP_SESSION_DATA_KEY = 'suppressions';

@Module({
  imports: [SuppressionsModule],
})
export class AppModule {}
