
interface Permission {
    id: number;
    action: string;
    resource: string
}

export const hasAccess = (
    userPermissions: Permission[] | undefined,
    requiredPermissions: string | string[],
): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;

    // If the user has `manage:all`, they have unrestricted access
    const hasManageAll = userPermissions.some(
        (perm) => perm.id === 1
    );
    if (hasManageAll) return true;
    
    // Normalize required permissions into an array
    const required = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

    // Check if all required permissions are satisfied
    return required.every((reqPerm) =>
        userPermissions.some(
            (perm) => `${perm.action}:${perm.resource}` === reqPerm
        )
    );
};


