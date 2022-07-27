import {MigrationInterface, QueryRunner} from "typeorm";

export class addManyToManyRelations1658916585833 implements MigrationInterface {
	name = "addManyToManyRelations1658916585833";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "tags_and_users" ("tag_id" integer NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_2f341f91429fd3093230e6ac368" PRIMARY KEY ("tag_id", "user_id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_ac223442b19b96b995597e4546" ON "tags_and_users" ("tag_id") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_6b1d818025a8509f5846e52238" ON "tags_and_users" ("user_id") `
		);
		await queryRunner.query(
			`ALTER TABLE "tags_and_users" ADD CONSTRAINT "FK_ac223442b19b96b995597e4546e" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "tags_and_users" ADD CONSTRAINT "FK_6b1d818025a8509f5846e522380" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "tags_and_users" DROP CONSTRAINT "FK_6b1d818025a8509f5846e522380"`
		);
		await queryRunner.query(
			`ALTER TABLE "tags_and_users" DROP CONSTRAINT "FK_ac223442b19b96b995597e4546e"`
		);
		await queryRunner.query(`DROP INDEX "public"."IDX_6b1d818025a8509f5846e52238"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_ac223442b19b96b995597e4546"`);
		await queryRunner.query(`DROP TABLE "tags_and_users"`);
	}
}
