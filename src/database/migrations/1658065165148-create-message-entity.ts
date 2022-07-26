import {MigrationInterface, QueryRunner} from "typeorm";

export class createMessageEntity1658065165148 implements MigrationInterface {
	name = "createMessageEntity1658065165148";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "author_id" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "messages" ADD CONSTRAINT "FK_05535bc695e9f7ee104616459d3" FOREIGN KEY ("author_id") REFERENCES "blogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "messages" DROP CONSTRAINT "FK_05535bc695e9f7ee104616459d3"`
		);
		await queryRunner.query(`DROP TABLE "messages"`);
	}
}
