export declare const Permissions: (...permissions: {
    action: string;
    subject: string;
}[]) => import("@nestjs/common").CustomDecorator<string>;
