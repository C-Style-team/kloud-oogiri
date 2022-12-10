import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentsModule } from './environments/environments.module';
import { HealthModule } from './health/health.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TwitterModule } from './twitter/twitter.module';

@Module({
  imports: [
    SubjectsModule,
    HealthModule,
    EnvironmentsModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    TwitterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
