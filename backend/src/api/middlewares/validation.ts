import { Request, Response, NextFunction } from 'express';
import { userLoginValidator, userJoinValidator } from '../validators/user';
import { Service } from 'typedi';

@Service()
export class ValidationMiddleware {
    validateUserLogin = async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = userLoginValidator.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next(); // 다음 미들웨어로 제어 넘김
    };

    validateUserJoin = async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = userJoinValidator.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next(); // 다음 미들웨어로 제어 넘김
    };
}
