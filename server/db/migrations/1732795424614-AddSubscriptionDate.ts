import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubscriptionDate1732795424614 implements MigrationInterface {
    name = 'AddSubscriptionDate1732795424614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`stripeCustomerId\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`stripeCustomerId\` varchar(255) NULL`);
    }

}
