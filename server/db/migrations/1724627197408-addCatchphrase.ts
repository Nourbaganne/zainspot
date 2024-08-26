import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCatchphrase1724627197408 implements MigrationInterface {
    name = 'AddCatchphrase1724627197408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cities\` ADD \`catchphrase\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`renewalDate\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`renewalStatus\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`renewalStatus\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`renewalDate\``);
        await queryRunner.query(`ALTER TABLE \`cities\` DROP COLUMN \`catchphrase\``);
    }

}
