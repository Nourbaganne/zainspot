import { MigrationInterface, QueryRunner } from "typeorm";

export class UserActivation1729943322689 implements MigrationInterface {
    name = 'UserActivation1729943322689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5318cc339ff1bc8c6085323602\` ON \`invoice\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`activation\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`activation\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5318cc339ff1bc8c6085323602\` ON \`invoice\` (\`paymentHistoryId\`)`);
    }

}
