import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStripe1726904607864 implements MigrationInterface {
    name = 'AddStripe1726904607864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`role\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`renewalDate\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`renewalStatus\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastStripeSessionId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_cb66e60a4064e177f600794cb9d\` FOREIGN KEY (\`cityId\`) REFERENCES \`city\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_cb66e60a4064e177f600794cb9d\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastStripeSessionId\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`renewalStatus\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`renewalDate\``);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`name\` \`role\` varchar(255) NOT NULL`);
    }

}
