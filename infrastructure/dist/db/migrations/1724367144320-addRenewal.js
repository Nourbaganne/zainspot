"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRenewal1724367144320 = void 0;
class AddRenewal1724367144320 {
    constructor() {
        this.name = 'AddRenewal1724367144320';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`renewalDate\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`renewalStatus\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`renewalStatus\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`renewalDate\``);
    }
}
exports.AddRenewal1724367144320 = AddRenewal1724367144320;
//# sourceMappingURL=1724367144320-addRenewal.js.map