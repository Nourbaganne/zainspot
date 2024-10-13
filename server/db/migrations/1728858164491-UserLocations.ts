import { MigrationInterface, QueryRunner } from "typeorm";

export class UserLocations1728858164491 implements MigrationInterface {
    name = 'UserLocations1728858164491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`zipCode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`fullStreetAdress\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fullStreetAdress\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`zipCode\``);
    }

}
