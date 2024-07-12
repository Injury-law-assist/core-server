import { Service } from 'typedi';

@Service()
export class AccessJwtConfig {
    public readonly secret: string;
    public readonly expiresIn: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || 'default_secret';
        this.expiresIn = process.env.JWT_EXPIRES_IN || '1h';
    }
}

@Service()
export class RefreshJwtConfig {
    public readonly secret: string;
    public readonly expiresIn: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || 'default_secret';
        this.expiresIn = process.env.JWT_EXPIRES_IN || '1h';
    }
}
