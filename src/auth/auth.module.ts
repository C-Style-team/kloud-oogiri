import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './apiKey.strategy';
import { EnvironmentsModule } from 'src/environments/environments.module';

@Module({
    imports: [PassportModule, EnvironmentsModule],
    providers: [HeaderApiKeyStrategy],
})
export class AuthModule { }
