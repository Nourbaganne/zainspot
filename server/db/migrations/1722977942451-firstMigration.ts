import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1722977942451 implements MigrationInterface {
    name = 'FirstMigration1722977942451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`action\` varchar(255) NOT NULL, \`resource\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`subscription\` json NOT NULL, \`date\` datetime NOT NULL, \`method\` varchar(255) NOT NULL, \`amount\` decimal NOT NULL, \`status\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`isEmailConfirmed\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`businessNumber\` varchar(255) NULL, \`businessName\` varchar(255) NOT NULL, \`tradeName\` varchar(255) NOT NULL, \`businessType\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`businessWebsite\` varchar(255) NOT NULL DEFAULT 'Unknown', \`state\` varchar(255) NOT NULL, \`interestRegion\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`middleName\` varchar(255) NOT NULL DEFAULT '', \`lastName\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`birthday\` date NULL, \`mediaProfile\` varchar(255) NULL DEFAULT '', \`roleId\` int NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dateIssued\` datetime NOT NULL, \`dueDate\` datetime NOT NULL, \`amount\` decimal NOT NULL, \`status\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`disponibility\` tinyint NOT NULL, \`location\` json NULL, \`description\` text NULL, \`goldPrice\` int NULL, \`classicPrice\` json NULL, \`imageUrl\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permissions\` (\`roleId\` int NOT NULL, \`permissionId\` int NOT NULL, INDEX \`IDX_b4599f8b8f548d35850afa2d12\` (\`roleId\`), INDEX \`IDX_06792d0c62ce6b0203c03643cd\` (\`permissionId\`), PRIMARY KEY (\`roleId\`, \`permissionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`payment_history\` ADD CONSTRAINT \`FK_34d643de1a588d2350297da5c24\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD CONSTRAINT \`FK_fcbe490dc37a1abf68f19c5ccb9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_b4599f8b8f548d35850afa2d12c\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_06792d0c62ce6b0203c03643cdd\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_06792d0c62ce6b0203c03643cdd\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_b4599f8b8f548d35850afa2d12c\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP FOREIGN KEY \`FK_fcbe490dc37a1abf68f19c5ccb9\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`payment_history\` DROP FOREIGN KEY \`FK_34d643de1a588d2350297da5c24\``);
        await queryRunner.query(`DROP INDEX \`IDX_06792d0c62ce6b0203c03643cd\` ON \`role_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_b4599f8b8f548d35850afa2d12\` ON \`role_permissions\``);
        await queryRunner.query(`DROP TABLE \`role_permissions\``);
        await queryRunner.query(`DROP TABLE \`cities\``);
        await queryRunner.query(`DROP TABLE \`invoices\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`payment_history\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
