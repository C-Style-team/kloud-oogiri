import { Controller, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private twitterService: TwitterService) {}
  @Put()
  @UseGuards(AuthGuard('api-key'))
  tweet() {
    return this.twitterService.tweet();
  }
}
