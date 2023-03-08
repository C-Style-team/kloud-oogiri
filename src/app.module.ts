import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentsModule } from './environments/environments.module';
import { HealthModule } from './health/health.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TwitterModule } from './twitter/twitter.module';
import { AuthModule } from './auth/auth.module';
import { NotionsModule } from './notions/notions.module';
import { LoggerMiddleware } from './app.middleware';

@Module({
  imports: [
    SubjectsModule,
    HealthModule,
    EnvironmentsModule,
    TwitterModule,
    AuthModule,
    NotionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
