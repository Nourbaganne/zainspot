import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPreferences1731100297870 implements MigrationInterface {
    name = 'AddUserPreferences1731100297870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`preferedLanguage\` varchar(255) NOT NULL DEFAULT 'USA'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`preferedCurrency\` varchar(255) NOT NULL DEFAULT 'USD'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`preferedCurrency\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`preferedLanguage\``);
    }

}
