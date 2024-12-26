import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteInterestRegions1735170400618 implements MigrationInterface {
    name = 'DeleteInterestRegions1735170400618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`interestRegion\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`interestRegion\` varchar(255) NOT NULL`);
    }

}
