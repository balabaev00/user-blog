import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBlogEntity1658065424660 implements MigrationInterface {
	name = "updateBlogEntity1658065424660";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "message"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "blogs" ADD "message" character varying NOT NULL`
		);
	}
}
