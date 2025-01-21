import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOnDeleteCascadeForPayInvoiceTable1737370128790 implements MigrationInterface {
    name = 'AddOnDeleteCascadeForPayInvoiceTable1737370128790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_5318cc339ff1bc8c60853236025\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_f8e849201da83b87f78c7497dde\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_5318cc339ff1bc8c60853236025\` FOREIGN KEY (\`paymentHistoryId\`) REFERENCES \`payment_history\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_f8e849201da83b87f78c7497dde\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_f8e849201da83b87f78c7497dde\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_5318cc339ff1bc8c60853236025\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_f8e849201da83b87f78c7497dde\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_5318cc339ff1bc8c60853236025\` FOREIGN KEY (\`paymentHistoryId\`) REFERENCES \`payment_history\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
