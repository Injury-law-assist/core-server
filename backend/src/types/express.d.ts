import { Request } from 'express';
export interface Payload {
    u_id: number;
    u_email: string;
    u_nickname: string;
    u_created_at: Date;
    u_updated_at: Date;
}
declare global {
    namespace Express {
        interface Request {
            user?: Payload;
        }
    }
}
