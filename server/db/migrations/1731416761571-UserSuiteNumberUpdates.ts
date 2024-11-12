import { MigrationInterface, QueryRunner } from "typeorm";

export class UserSuiteNumberUpdates1731416761571 implements MigrationInterface {
    name = 'UserSuiteNumberUpdates1731416761571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`suiteNumber\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`suiteNumber\``);
    }

}
