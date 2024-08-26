import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class FirstMigration1722977022752 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
