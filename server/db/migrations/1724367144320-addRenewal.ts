import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRenewal1724451762182 implements MigrationInterface {
    name = 'AddRenewal1724451762182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`renewalDate\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`renewalStatus\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`renewalStatus\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`renewalDate\``);
    }

}
