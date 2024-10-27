import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailAuthentication1730034085309 implements MigrationInterface {
    name = 'EmailAuthentication1730034085309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`EmailAuthentication\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`EmailAuthentication\``);
    }

}
