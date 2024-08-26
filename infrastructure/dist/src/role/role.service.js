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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const role_entity_1 = require("../entities/role.entity");
const permission_entity_1 = require("../entities/permission.entity");
let RoleService = class RoleService {
    constructor() { }
    async create(createRoleDto) {
        const newRole = role_entity_1.Role.create({
            role: createRoleDto.role,
            permissions: createRoleDto.permissions,
        });
        return role_entity_1.Role.save(newRole);
    }
    findAll() {
        return role_entity_1.Role.find({ relations: ['permissions'] });
    }
    async findOne(id) {
        const role = await role_entity_1.Role.findOne({
            where: { id },
            relations: ['permissions'],
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }
    async addPermissionToRole(roleId, permissionId) {
        const role = await this.findOne(roleId);
        const permission = await permission_entity_1.Permission.findOne({
            where: { id: permissionId },
        });
        if (!permission) {
            throw new Error('Permission not found');
        }
        role.permissions.push(permission);
        await role_entity_1.Role.save(role);
        return role;
    }
    async removePermissionFromRole(roleId, permissionId) {
        const role = await role_entity_1.Role.findOne({
            where: { id: roleId },
            relations: ['permissions'],
        });
        if (!role) {
            throw new Error('Role not found');
        }
        const permission = await permission_entity_1.Permission.findOne({
            where: { id: permissionId },
        });
        if (!permission) {
            throw new Error('Permission not found');
        }
        role.permissions = role.permissions.filter((p) => p.id !== permissionId);
        await role_entity_1.Role.save(role);
        return role;
    }
    async update(id, updateRoleDto) {
        const role = await role_entity_1.Role.preload({
            id,
            ...updateRoleDto,
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        return role_entity_1.Role.save(role);
    }
    async remove(id) {
        const result = await role_entity_1.Role.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RoleService);
//# sourceMappingURL=role.service.js.map