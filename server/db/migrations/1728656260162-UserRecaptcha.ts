import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRecaptcha1728656260162 implements MigrationInterface {
    name = 'UserRecaptcha1728656260162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`recaptcha\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`recaptcha\``);
    }

}
