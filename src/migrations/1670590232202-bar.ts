import { MigrationInterface, QueryRunner } from "typeorm";

export class bar1670590232202 implements MigrationInterface {
    name = 'bar1670590232202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subject" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "author" character varying NOT NULL, "isTweets" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subject"`);
    }

}
