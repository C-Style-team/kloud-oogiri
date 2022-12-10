import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env['DATABASE_HOST'] || 'localhost',
    port: parseInt(process.env['DATABASE_PORT'] || '5432') || 5432,
    username: process.env['DATABASE_USERNAME'] || 'test',
    password: process.env['DATABASE_PASSWORD'] || 'test',
    database: process.env['DATABASE_DATABASE'] || 'holo-oogiri',
    entities: [
        'dist/**/*.entity.js'
    ],
    migrations: ['dist/**/migrations/*.js'],
    migrationsTableName: 'history',
    synchronize: process.env['DATABASE_SYNCHRONIZE'] === 'true',
    logging: true,
    migrationsRun: false,
});
