import { HttpCode, Injectable, Response } from '@nestjs/common';
import { response } from 'express';
import { EnvironmentsService } from 'src/environments/environments.service';
import { SubjectsService } from 'src/subjects/subjects.service';
import {
  EUploadMimeType,
  TweetV2PostTweetResult,
  TwitterApi,
} from 'twitter-api-v2';

@Injectable()
export class TwitterService {
  constructor(
    private subjectsService: SubjectsService,
    private envServise: EnvironmentsService,
  ) {}

  private twitterClient = new TwitterApi({
    appKey: this.envServise.TwitterKey,
    appSecret: this.envServise.TwitterSecret,
    accessToken: this.envServise.TwitterAccessToken,
    accessSecret: this.envServise.TwitterAccessTokenSecret,
  });

  async uploadImage(url: string) {
    const res = await fetch(url);
    const blob = await res.blob();
    const arrayBuf = await blob.arrayBuffer();
    const buf = Buffer.from(arrayBuf);
    const media = await this.twitterClient.v1.uploadMedia(buf, {
      mimeType: EUploadMimeType.Jpeg,
    });
    return media;
  }

  async tweet() {
    const subs = await this.subjectsService.getToday();
    try {
      subs.map(async (sub) => {
        const media = await this.uploadImage(
          (() => {
            if (sub.properties['アイキャッチ'].type == 'files') {
              if (
                sub.properties['アイキャッチ'].files[0] &&
                sub.properties['アイキャッチ'].files[0].type == 'file'
              ) {
                return sub.properties['アイキャッチ'].files[0].file.url;
              }
            }
          })(),
        );
        const tag: string = (() => {
          if (sub.properties['専用タグ'].type === 'rich_text') {
            if (sub.properties['専用タグ'].rich_text[0].type === 'text') {
              return sub.properties['専用タグ'].rich_text[0].text.content;
            }
          }
        })();
        //TODO 絵文字ランダム
        const fullText = `引用リツイートでご回答ください😊
#Kloud #Kloud大喜利 #高専 ${tag}`;
        if (media && sub) {
          this.twitterClient.v2.tweet(fullText, {
            media: { media_ids: [media] },
          });
          //TODO
          await this.subjectsService.updateStatusToAggregating(sub);
        }
      });
      return response.status(200);
    } catch (e) {
      return null;
    }
  }
}
