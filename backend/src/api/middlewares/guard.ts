import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import JwtService from '../../services/jwt';
import { Payload } from '../../types/express';

export default (req: Request, res: Response, next: NextFunction) => {
    const BearerToken = req.headers.authorization;
    if (!BearerToken || !BearerToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: '인증되지 않은 요청입니다.' });
    }
    const accessToken = BearerToken.split(' ')[1];
    const jwtService = Container.get(JwtService);
    try {
        const payload = jwtService.verifyAccessToken(accessToken);
        req.user = payload as Payload;

        next();
    } catch (error) {
        console.error('토큰 검증 오류:', error);
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
};
