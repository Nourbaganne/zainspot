import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTelnyxNumber1741828496462 implements MigrationInterface {
    name = 'AddTelnyxNumber1741828496462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_5318cc339ff1bc8c60853236025\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_f8e849201da83b87f78c7497dde\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP FOREIGN KEY \`FK_3309cd631d6c3263c550d19ff19\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`telnyxNumber\` varchar(255) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`numberStatus\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_5318cc339ff1bc8c60853236025\` FOREIGN KEY (\`paymentHistoryId\`) REFERENCES \`payment_history\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_f8e849201da83b87f78c7497dde\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD CONSTRAINT \`FK_3309cd631d6c3263c550d19ff19\` FOREIGN KEY (\`subscriptionId\`) REFERENCES \`subscription\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP FOREIGN KEY \`FK_3309cd631d6c3263c550d19ff19\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_f8e849201da83b87f78c7497dde\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_5318cc339ff1bc8c60853236025\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`numberStatus\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`telnyxNumber\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD CONSTRAINT \`FK_3309cd631d6c3263c550d19ff19\` FOREIGN KEY (\`subscriptionId\`) REFERENCES \`subscription\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_f8e849201da83b87f78c7497dde\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_5318cc339ff1bc8c60853236025\` FOREIGN KEY (\`paymentHistoryId\`) REFERENCES \`payment_history\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
