import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSubjectDio } from './dio/create.dio';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Get()
  list() {
    return this.subjectsService.list();
  }

  @Get('random')
  getRandom() {
    return this.subjectsService.getRandom();
  }

  @Delete()
  deleteSubject() {
    return null;
  }

  @Post()
  postSubject(@Body() createSubDio: CreateSubjectDio) {
    return this.subjectsService.create(createSubDio);
  }

  @Put(':id')
  updateTweetedSubject(@Param('id') id: number) {
    return this.subjectsService.changeTweeted(id);
  }
}
