import { Controller, Put } from '@nestjs/common';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private twitterService: TwitterService) {}
  @Put()
  tweet() {
    return this.twitterService.tweet();
  }
}
