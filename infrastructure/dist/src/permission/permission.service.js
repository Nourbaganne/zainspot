"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const permission_entity_1 = require("../entities/permission.entity");
let PermissionService = class PermissionService {
    constructor() { }
    async create(createPermissionDto) {
        const newPermission = permission_entity_1.Permission.create(createPermissionDto);
        return permission_entity_1.Permission.save(newPermission);
    }
    findAll() {
        return permission_entity_1.Permission.find();
    }
    async findOne(id) {
        const permission = await permission_entity_1.Permission.findOne({
            where: { id },
        });
        if (!permission) {
            throw new common_1.NotFoundException(`Permission with ID ${id} not found`);
        }
        return permission;
    }
    async update(id, updatePermissionDto) {
        const permission = await permission_entity_1.Permission.preload({
            id,
            ...updatePermissionDto,
        });
        if (!permission) {
            throw new common_1.NotFoundException(`Permission with ID ${id} not found`);
        }
        return permission_entity_1.Permission.save(permission);
    }
    async remove(id) {
        const result = await permission_entity_1.Permission.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Permission with ID ${id} not found`);
        }
    }
};
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PermissionService);
//# sourceMappingURL=permission.service.js.map