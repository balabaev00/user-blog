import {MigrationInterface, QueryRunner} from "typeorm";

export class createAllEntities1658886304059 implements MigrationInterface {
	name = "createAllEntities1658886304059";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "nickname" character varying(30) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "sort_order" integer NOT NULL DEFAULT '0', "creator_id" uuid, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "tags" ADD CONSTRAINT "FK_78e65343656c6c8895a87e1efb5" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "tags" DROP CONSTRAINT "FK_78e65343656c6c8895a87e1efb5"`
		);
		await queryRunner.query(`DROP TABLE "tags"`);
		await queryRunner.query(`DROP TABLE "users"`);
	}
}
