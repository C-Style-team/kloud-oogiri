import {
  Controller,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private twitterService: TwitterService) {}
  @Put()
  @UseGuards(AuthGuard('api-key'))
  async tweet() {
    const tweet = await this.twitterService.sending();
    if (tweet == null) {
      return new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error.',
        },
        500,
      );
    }
    return tweet;
  }
}
