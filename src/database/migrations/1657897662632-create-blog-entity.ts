import {MigrationInterface, QueryRunner} from "typeorm";

export class createBlogEntity1657897662632 implements MigrationInterface {
	name = "createBlogEntity1657897662632";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "blogs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "author_id" integer, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "blogs" ADD CONSTRAINT "FK_b324119dcb71e877cee411f7929" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "blogs" DROP CONSTRAINT "FK_b324119dcb71e877cee411f7929"`
		);
		await queryRunner.query(`DROP TABLE "blogs"`);
	}
}
