import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBlogEntity1657943260340 implements MigrationInterface {
	name = "updateBlogEntity1657943260340";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "blogs" ADD "name" character varying NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "blogs" ADD "message" character varying NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "message"`);
		await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "name"`);
	}
}
