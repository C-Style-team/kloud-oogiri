import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import * as dayjs from 'dayjs';
import { EnvironmentsService } from 'src/environments/environments.service';

@Injectable()
export class NotionsService {
  constructor(private envServise: EnvironmentsService) {}

  private notion: Client = new Client({
    auth: this.envServise.notionApiKey,
  });

  async getList() {
    const database = await this.notion.databases.query({
      //TODO use env
      database_id: '121070279bdb4cfdb58456cf817b21c1',
    });

    return database.results;
  }

  async changeStatus(pageId: string, status: string) {
    const page = await this.notion.pages.update({
      page_id: pageId,
      properties: {
        Status: {
          select: {
            id: status,
          },
        },
      },
    });
    return page;
  }

  async getToday() {
    const database = await this.notion.databases.query({
      //TODO use env
      database_id: '121070279bdb4cfdb58456cf817b21c1',
    });

    const results: PageObjectResponse[] = (
      database.results.filter((i) => 'properties' in i) as PageObjectResponse[]
    ).filter((i) => {
      if (
        i.properties['投稿日'].type === 'date' &&
        i.properties['Status'].type === 'select'
      ) {
        if (
          i.properties['投稿日'].date != null &&
          i.properties['投稿日'].date.start != null &&
          i.properties['Status'].select != null &&
          i.properties['Status'].select.name === 'アイキャッチ作った'
        ) {
          return (
            dayjs(i.properties['投稿日'].date.start).date() ===
              dayjs().date() &&
            dayjs(i.properties['投稿日'].date.start).month() === dayjs().month()
          );
        } else {
          return false;
        }
      }
    });
    return results;
  }
}
