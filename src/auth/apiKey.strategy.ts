import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { EnvironmentsService } from 'src/environments/environments.service';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
  Strategy,
  'api-key',
) {
  constructor(private readonly envService: EnvironmentsService) {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      return this.validate(apiKey, done);
    });
  }

  public validate = (
    apiKey: string,
    done: (error: Error, isData: boolean) => { any },
  ) => {
    if (this.envService.apiKey === apiKey) {
      console.log(apiKey);
      done(null, true);
    }
    done(new UnauthorizedException(), null);
  };
}
