import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//TODO envモジュールを作ったが、モジュール内のimportでの呼び出し方がわからなかったのでわかったらそちらを使う
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env['DATABASE_HOST'] || 'localhost',
            port: parseInt(process.env['DATABASE_PORT'] || '5432') || 5432,
            username: process.env['DATABASE_USERNAME'] || 'test',
            password: process.env['DATABASE_PASSWORD'] || 'test',
            database: process.env['DATABASE_DATABASE'] || 'holo-oogiri',
            entities: [
                __dirname + '/../../**/*.entity{.ts,.js}', // /src 内のすべての entity file を読み込んでいる
            ],
            synchronize: process.env['DATABASE_SYNCHRONIZE'] === 'true',
        }),
    ],
})
export class DatabaseModule { }
