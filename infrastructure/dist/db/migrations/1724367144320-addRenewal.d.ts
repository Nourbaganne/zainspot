import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddRenewal1724367144320 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
