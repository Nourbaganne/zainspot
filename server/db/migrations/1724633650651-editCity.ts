import { MigrationInterface, QueryRunner } from "typeorm";

export class EditCity1724633650651 implements MigrationInterface {
    name = 'EditCity1724633650651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cities\` DROP COLUMN \`catchphrase\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cities\` ADD \`catchphrase\` text NULL`);
    }

}
