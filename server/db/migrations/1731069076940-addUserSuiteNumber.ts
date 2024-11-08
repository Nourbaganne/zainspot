import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserSuiteNumber1731069076940 implements MigrationInterface {
    name = 'AddUserSuiteNumber1731069076940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`suiteNumber\` varchar(255) NOT NULL DEFAULT 'Z01'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`suiteNumber\``);
    }

}
