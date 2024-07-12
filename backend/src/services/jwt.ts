// src/services/jwtService.ts
import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { AccessJwtConfig } from '../configs/jwt';
import { RefreshJwtConfig } from '../configs/jwt';

@Service()
export default class JwtService {
    constructor(
        @Inject(() => AccessJwtConfig) private readonly accessJwtConfig: AccessJwtConfig,
        @Inject(() => RefreshJwtConfig) private readonly refreshJwtConfig: RefreshJwtConfig,
    ) {}

    generateAccessToken(payload: object): string {
        return jwt.sign(payload, this.accessJwtConfig.secret, { expiresIn: this.accessJwtConfig.expiresIn });
    }

    generateRefreshToken(payload: object): string {
        return jwt.sign(payload, this.refreshJwtConfig.secret, { expiresIn: this.refreshJwtConfig.expiresIn });
    }

    verifyAccessToken(token: string): object | string {
        try {
            return jwt.verify(token, this.accessJwtConfig.secret);
        } catch (error) {
            throw new Error('Invalid access token');
        }
    }

    verifyRefreshToken(token: string): object | string {
        try {
            return jwt.verify(token, this.refreshJwtConfig.secret);
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
}
