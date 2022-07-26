import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAllEntities1658067379120 implements MigrationInterface {
	name = "updateAllEntities1658067379120";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "messages" DROP CONSTRAINT "FK_05535bc695e9f7ee104616459d3"`
		);
		await queryRunner.query(`ALTER TABLE "messages" ADD "blog_id" integer`);
		await queryRunner.query(
			`ALTER TABLE "messages" ADD CONSTRAINT "FK_05535bc695e9f7ee104616459d3" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "messages" ADD CONSTRAINT "FK_c44c8ea17845e2e4aa23a1b4bfc" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "messages" DROP CONSTRAINT "FK_c44c8ea17845e2e4aa23a1b4bfc"`
		);
		await queryRunner.query(
			`ALTER TABLE "messages" DROP CONSTRAINT "FK_05535bc695e9f7ee104616459d3"`
		);
		await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "blog_id"`);
		await queryRunner.query(
			`ALTER TABLE "messages" ADD CONSTRAINT "FK_05535bc695e9f7ee104616459d3" FOREIGN KEY ("author_id") REFERENCES "blogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
