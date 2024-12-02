import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateVisitorTable1733153369950 implements MigrationInterface {
    name = 'UpdateVisitorTable1733153369950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`visitor\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`visitor\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`visitor\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`visitor\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`visitor\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`visitor\` ADD PRIMARY KEY (\`id\`)`);
    }

}
