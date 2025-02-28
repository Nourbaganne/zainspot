import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveSuiteNumber1731416609877 implements MigrationInterface {
    name = 'RemoveSuiteNumber1731416609877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`suiteNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`preferedLanguage\` \`preferedLanguage\` varchar(255) NOT NULL DEFAULT 'AR'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`preferedLanguage\` \`preferedLanguage\` varchar(255) NOT NULL DEFAULT 'EN'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`suiteNumber\` varchar(255) NOT NULL DEFAULT 'Z01'`);
    }

}
