import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

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
