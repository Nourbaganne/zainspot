import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCityTableName1724679545570 implements MigrationInterface {
    name = 'UpdateCityTableName1724679545570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_cb66e60a4064e177f600794cb9d\``);
        await queryRunner.query(`CREATE TABLE \`city\` (\`id\` int NOT NULL AUTO_INCREMENT, \`city\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`hidden\` tinyint NOT NULL, \`location\` json NULL, \`description\` text NULL, \`catchphrase\` text NULL, \`goldPrice\` json NULL, \`classicPrice\` json NULL, \`imageUrl\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_cb66e60a4064e177f600794cb9d\` FOREIGN KEY (\`cityId\`) REFERENCES \`city\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_cb66e60a4064e177f600794cb9d\``);
        await queryRunner.query(`DROP TABLE \`city\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_cb66e60a4064e177f600794cb9d\` FOREIGN KEY (\`cityId\`) REFERENCES \`cities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
