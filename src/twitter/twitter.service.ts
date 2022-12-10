import { Injectable } from '@nestjs/common';
import { EnvironmentsService } from 'src/environments/environments.service';
import { SubjectsService } from 'src/subjects/subjects.service';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TwitterService {
    constructor(
        private subjectsService: SubjectsService,
        private envServise: EnvironmentsService
    ) { }

    private twitterClient = new TwitterApi({
        appKey: this.envServise.TwitterKey,
        appSecret: this.envServise.TwitterSecret,
        accessToken: this.envServise.TwitterAccessToken,
        accessSecret: this.envServise.TwitterAccessTokenSecret,
    })

    async tweet() {
        const sub = await this.subjectsService.getRandom()
        const fullText =
            `#ホロライブ大喜利
毎日19時にホロライブに関する大喜利のお題を出しています！

今日のお代は！
「${sub.text}」

皆さんぜひご回答ください！
        `
        const tweet = await this.twitterClient.v2.tweet(fullText)
        await this.subjectsService.changeTweeted(sub.id)
        return this.twitterClient.v2.singleTweet(tweet.data.id)
    }
}
