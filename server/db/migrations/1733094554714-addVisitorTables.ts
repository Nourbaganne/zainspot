import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVisitorTables1733094554714 implements MigrationInterface {
    name = 'AddVisitorTables1733094554714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`visitor\` (\`id\` int NOT NULL, \`visitorId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_037234bfa900a5b4bdde6f86da\` (\`visitorId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_037234bfa900a5b4bdde6f86da\` ON \`visitor\``);
        await queryRunner.query(`DROP TABLE \`visitor\``);
    }

}
