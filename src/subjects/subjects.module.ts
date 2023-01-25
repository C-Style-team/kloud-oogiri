import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { NotionsModule } from 'src/notions/notions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), NotionsModule],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}
