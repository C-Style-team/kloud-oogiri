import { Injectable } from '@nestjs/common';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { title } from 'process';
import { NotionsService } from 'src/notions/notions.service';

enum StatusType {
  '集計中' = '78d68e44-edf9-4c7b-bef9-27989b08576f',
  '集計終' = '8b53344d-54c8-42f9-955e-333361c382de',
}

@Injectable()
export class SubjectsService {
  constructor(private notionServise: NotionsService) {}

  list() {
    return this.notionServise.getList();
  }

  getToday() {
    return this.notionServise.getToday();
  }

  updateStatusToAggregating(page: PageObjectResponse) {
    const id = page.id;
    return this.notionServise.changeStatus(id, StatusType.集計中);
  }
}
