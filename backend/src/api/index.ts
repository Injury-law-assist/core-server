import { Router } from 'express';
import auth from './routes/auth';
import chat from './routes/chat';

export default () => {
    const router = Router();
    /**
     * 여기에 start
     */
    auth({ app: router });
    chat({ app: router });

    return router;
};
