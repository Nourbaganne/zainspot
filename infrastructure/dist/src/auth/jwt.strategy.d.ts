import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: {
        userId: number;
        email: string;
        role: string;
    }): Promise<{
        userId: number;
        email: string;
        role: string;
    }>;
}
export {};
