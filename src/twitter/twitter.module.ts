import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { EnvironmentsModule } from 'src/environments/environments.module';

@Module({
  providers: [TwitterService],
  controllers: [TwitterController],
  imports: [SubjectsModule, EnvironmentsModule],
})
export class TwitterModule {}
