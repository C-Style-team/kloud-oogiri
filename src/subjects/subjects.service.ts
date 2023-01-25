import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotionsService } from 'src/notions/notions.service';
import { Repository } from 'typeorm';
import { CreateSubjectDio } from './dio/create.dio';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepo: Repository<Subject>,
    private notionServise: NotionsService,
  ) {}

  list() {
    return this.notionServise.getList();
  }

  getToday() {
    return this.notionServise.getToday();
  }
}
