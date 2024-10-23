import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveImageUrl1729610564181 implements MigrationInterface {
    name = 'RemoveImageUrl1729610564181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD \`subscriptionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD UNIQUE INDEX \`IDX_3309cd631d6c3263c550d19ff1\` (\`subscriptionId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_3309cd631d6c3263c550d19ff1\` ON \`payment_history\` (\`subscriptionId\`)`);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD CONSTRAINT \`FK_3309cd631d6c3263c550d19ff19\` FOREIGN KEY (\`subscriptionId\`) REFERENCES \`subscription\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP FOREIGN KEY \`FK_3309cd631d6c3263c550d19ff19\``);
        await queryRunner.query(`DROP INDEX \`REL_3309cd631d6c3263c550d19ff1\` ON \`payment_history\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP INDEX \`IDX_3309cd631d6c3263c550d19ff1\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP COLUMN \`subscriptionId\``);
    }

}
