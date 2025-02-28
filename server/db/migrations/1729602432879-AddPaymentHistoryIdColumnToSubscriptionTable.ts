import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentHistoryIdColumnToSubscriptionTable1729602432879 implements MigrationInterface {
    name = 'AddPaymentHistoryIdColumnToSubscriptionTable1729602432879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_cc906b4bc892b048f1b654d2aa0\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP FOREIGN KEY \`FK_34d643de1a588d2350297da5c24\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_cc906b4bc892b048f1b654d2aa0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD CONSTRAINT \`FK_34d643de1a588d2350297da5c24\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP FOREIGN KEY \`FK_34d643de1a588d2350297da5c24\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_cc906b4bc892b048f1b654d2aa0\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD CONSTRAINT \`FK_34d643de1a588d2350297da5c24\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_cc906b4bc892b048f1b654d2aa0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
