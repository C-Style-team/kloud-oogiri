import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentsService {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  returnEmptyString = (str: string | undefined): string => {
    return str != null ? str : '';
  };

  get service() {
    return this.configService;
  }

  get NodeEnv(): string {
    return this.returnEmptyString(this.configService.get('NODE_ENV'));
  }

  get DatabasePort(): string {
    return this.returnEmptyString(this.configService.get('DATABASE_PORT'));
  }

  get DatabaseHost(): string {
    return this.returnEmptyString(this.configService.get('DATABASE_HOST'));
  }

  get DatabaseType(): string {
    return this.returnEmptyString(this.configService.get('DATABASE_TYPE'));
  }

  get DatabaseUsername(): string {
    return this.returnEmptyString(this.configService.get('DATABASE_USERNAME'));
  }

  get DatabasePassword(): string {
    return this.returnEmptyString(this.configService.get('DATABASE_PASSWORD'));
  }

  get DatabaseDatabase(): string {
    return this.returnEmptyString(this.configService.get('DATABASE_DATABASE'));
  }

  get DatabaseSynchronize(): string {
    return this.returnEmptyString(
      this.configService.get('DATABASE_SYNCHRONIZE'),
    );
  }

  get TwitterToken(): string {
    return this.returnEmptyString(this.configService.get('TWITTER_TOKEN'));
  }

  get TwitterKey(): string {
    return this.returnEmptyString(this.configService.get('TWITTER_KEY'));
  }

  get TwitterSecret(): string {
    return this.returnEmptyString(this.configService.get('TWITTER_SECRET'));
  }

  get TwitterAccessToken(): string {
    return this.returnEmptyString(
      this.configService.get('TWITTER_ACCESS_TOKEN'),
    );
  }

  get TwitterAccessTokenSecret(): string {
    return this.returnEmptyString(
      this.configService.get('TWITTER_ACCESS_TOKEN_SECRET'),
    );
  }
}
