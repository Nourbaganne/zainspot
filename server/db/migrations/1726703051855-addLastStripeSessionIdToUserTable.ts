import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastStripeSessionIdToUserTable1726703051855 implements MigrationInterface {
    name = 'AddLastStripeSessionIdToUserTable1726703051855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastStripeSessionId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastStripeSessionId\``);
    }

}
