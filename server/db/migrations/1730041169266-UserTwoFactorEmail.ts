import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTwoFactorEmail1730041169266 implements MigrationInterface {
    name = 'UserTwoFactorEmail1730041169266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`twoFactorCode\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`twoFactorCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`twoFactorCodeExpiresAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`twoFactorCodeExpiresAt\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`twoFactorCodeExpiresAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`twoFactorCodeExpiresAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`twoFactorCode\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`twoFactorCode\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

}
