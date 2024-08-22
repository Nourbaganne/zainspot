import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRenewals1724308204172 implements MigrationInterface {
    name = 'AddRenewals1724308204172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`renewalDate\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`renewalStatus\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`renewalStatus\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`renewalDate\``);
    }

}
