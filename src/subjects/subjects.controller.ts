import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Patch('change-aggregationg')
  @UseGuards(AuthGuard('api-key'))
  async update() {
    const page = await this.subjectsService.getToday();

    return this.subjectsService.updateStatusToAggregating(page[0]);
  }

  @Get()
  @UseGuards(AuthGuard('api-key'))
  list() {
    return this.subjectsService.list();
  }

  @Get('/today')
  @UseGuards(AuthGuard('api-key'))
  today() {
    return this.subjectsService.getToday();
  }
}
