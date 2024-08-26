import { BaseEntity } from 'typeorm';
export declare enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete"
}
export declare class Permission extends BaseEntity {
    id: number;
    action: Action;
    resource: string;
}
