import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStripeSessionIdToPaymentHistoryTableAndRemoveItFromUser1727874220387 implements MigrationInterface {
    name = 'AddStripeSessionIdToPaymentHistoryTableAndRemoveItFromUser1727874220387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastStripeSessionId\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD \`stripeSessionId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP COLUMN \`stripeSessionId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastStripeSessionId\` varchar(255) NULL`);
    }

}
