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
import { CreateSubjectDio } from './dio/create.dio';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
    constructor(private subjectsService: SubjectsService) { }

    @Get()
    list() {
        return this.subjectsService.list();
    }

    @Get('random')
    getRandom() {
        return this.subjectsService.getRandom();
    }

    @Delete()
    @UseGuards(AuthGuard('api-key'))
    deleteSubject() {
        return null;
    }

    @Post()
    @UseGuards(AuthGuard('api-key'))
    postSubject(@Body() createSubDio: CreateSubjectDio) {
        return this.subjectsService.create(createSubDio);
    }

    @Put(':id')
    @UseGuards(AuthGuard('api-key'))
    updateTweetedSubject(@Param('id') id: number) {
        return this.subjectsService.changeTweeted(id);
    }
}
