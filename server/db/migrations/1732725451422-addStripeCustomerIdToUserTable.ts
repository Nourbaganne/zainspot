import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStripeCustomerIdToUserTable1732725451422 implements MigrationInterface {
    name = 'AddStripeCustomerIdToUserTable1732725451422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`stripeCustomerId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`stripeCustomerId\``);
    }

}
