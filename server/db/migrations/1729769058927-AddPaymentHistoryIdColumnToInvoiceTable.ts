import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentHistoryIdColumnToInvoiceTable1729769058927 implements MigrationInterface {
    name = 'AddPaymentHistoryIdColumnToInvoiceTable1729769058927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_3309cd631d6c3263c550d19ff1\` ON \`payment_history\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`paymentHistoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD UNIQUE INDEX \`IDX_5318cc339ff1bc8c6085323602\` (\`paymentHistoryId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5318cc339ff1bc8c6085323602\` ON \`invoice\` (\`paymentHistoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_5318cc339ff1bc8c60853236025\` FOREIGN KEY (\`paymentHistoryId\`) REFERENCES \`payment_history\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_5318cc339ff1bc8c60853236025\``);
        await queryRunner.query(`DROP INDEX \`REL_5318cc339ff1bc8c6085323602\` ON \`invoice\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP INDEX \`IDX_5318cc339ff1bc8c6085323602\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`paymentHistoryId\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_3309cd631d6c3263c550d19ff1\` ON \`payment_history\` (\`subscriptionId\`)`);
    }

}
