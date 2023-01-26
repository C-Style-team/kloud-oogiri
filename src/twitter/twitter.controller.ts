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

  @Put('/test')
  imageUpload() {
    return this.twitterService.uploadImage(
      'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d2404ec4-13e8-4042-a693-d87b82da37fd/717E313F-43ED-4FCE-8E1C-C6B901423F33.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230125T120022Z&X-Amz-Expires=3600&X-Amz-Signature=286f82b729c0e46280c9a90601bb94748f0d40aac0287ace65e5431874a578e8&X-Amz-SignedHeaders=host&x-id=GetObject',
    );
  }
}
