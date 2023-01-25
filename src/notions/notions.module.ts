import { Module } from '@nestjs/common';
import { EnvironmentsModule } from 'src/environments/environments.module';
import { NotionsService } from './notions.service';

@Module({
  providers: [NotionsService],
  imports: [EnvironmentsModule],
  exports: [NotionsService],
})
export class NotionsModule {}
