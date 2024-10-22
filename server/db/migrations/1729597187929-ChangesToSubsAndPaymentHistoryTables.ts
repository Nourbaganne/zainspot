import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangesToSubsAndPaymentHistoryTables1729597187929 implements MigrationInterface {
    name = 'ChangesToSubsAndPaymentHistoryTables1729597187929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_166c9f050dd956fcb00e9a8276c\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`paymentId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`paymentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_166c9f050dd956fcb00e9a8276c\` FOREIGN KEY (\`paymentId\`) REFERENCES \`payment_history\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
