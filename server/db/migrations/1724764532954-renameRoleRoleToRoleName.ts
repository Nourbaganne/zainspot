import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameRoleRoleToRoleName1724764532954 implements MigrationInterface {
    name = 'RenameRoleRoleToRoleName1724764532954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`role\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`name\` \`role\` varchar(255) NOT NULL`);
    }

}
