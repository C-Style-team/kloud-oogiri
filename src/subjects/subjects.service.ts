import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDio } from './dio/create.dio';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subject)
        private subjectsRepo: Repository<Subject>
    ) { }

    list() {
        return this.subjectsRepo.find();
    }



    async getRandom() {
        const query = this.subjectsRepo.createQueryBuilder("subject").orderBy("RANDOM()").where("subject.isTweets = false").getOne()

        return query
    }

    async create(createSubDio: CreateSubjectDio) {
        const subject = this.subjectsRepo.create(createSubDio)
        return this.subjectsRepo.save(subject);
    }

    async changeTweeted(id: number) {
        const sub = await this.subjectsRepo.findOneBy({ id })
        const update = await this.subjectsRepo.update(sub, { isTweets: true })
        return update
    }
}
