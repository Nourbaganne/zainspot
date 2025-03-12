import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNumberStatus1740223995265 implements MigrationInterface {
    name = 'AddNumberStatus1740223995265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`numberStatus\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`numberStatus\``);
    }

}
