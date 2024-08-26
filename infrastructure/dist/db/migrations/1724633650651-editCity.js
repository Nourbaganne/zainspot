"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCity1724633650651 = void 0;
class EditCity1724633650651 {
    constructor() {
        this.name = 'EditCity1724633650651';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`cities\` DROP COLUMN \`catchphrase\``);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`cities\` ADD \`catchphrase\` text NULL`);
    }
}
exports.EditCity1724633650651 = EditCity1724633650651;
//# sourceMappingURL=1724633650651-editCity.js.map