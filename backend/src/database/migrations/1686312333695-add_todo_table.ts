import { MigrationInterface, QueryRunner } from "typeorm";

export class addTodoTable1686312333695 implements MigrationInterface {
    name = 'addTodoTable1686312333695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "order" integer NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
