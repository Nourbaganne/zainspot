import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateContactTableSchema1724789031550 implements MigrationInterface {
    name = 'UpdateContactTableSchema1724789031550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`contact\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`contact\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact\` ADD \`subject\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact\` DROP COLUMN \`subject\``);
        await queryRunner.query(`ALTER TABLE \`contact\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`contact\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`contact\` ADD \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact\` ADD \`name\` varchar(255) NOT NULL`);
    }

}
