import { MigrationInterface, QueryRunner } from "typeorm";

export class OnDeleteSubscriptionSetPaymentHistSubsToNull1737369476619 implements MigrationInterface {
    name = 'OnDeleteSubscriptionSetPaymentHistSubsToNull1737369476619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP FOREIGN KEY \`FK_3309cd631d6c3263c550d19ff19\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`interestRegion\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD CONSTRAINT \`FK_3309cd631d6c3263c550d19ff19\` FOREIGN KEY (\`subscriptionId\`) REFERENCES \`subscription\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP FOREIGN KEY \`FK_3309cd631d6c3263c550d19ff19\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`interestRegion\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD CONSTRAINT \`FK_3309cd631d6c3263c550d19ff19\` FOREIGN KEY (\`subscriptionId\`) REFERENCES \`subscription\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
