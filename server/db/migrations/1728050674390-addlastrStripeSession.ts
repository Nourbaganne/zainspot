import { MigrationInterface, QueryRunner } from "typeorm";

export class AddlastrStripeSession1728050674390 implements MigrationInterface {
    name = 'AddlastrStripeSession1728050674390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP COLUMN \`subscription\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastStripeSessionId\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD \`stripeSessionId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`paymentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_history\` CHANGE \`method\` \`method\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_166c9f050dd956fcb00e9a8276c\` FOREIGN KEY (\`paymentId\`) REFERENCES \`payment_history\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_166c9f050dd956fcb00e9a8276c\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` CHANGE \`method\` \`method\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`paymentId\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP COLUMN \`stripeSessionId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastStripeSessionId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD \`subscription\` json NOT NULL`);
    }

}
