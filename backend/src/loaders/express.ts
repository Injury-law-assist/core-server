import { Application, json, urlencoded } from 'express';
import router from '../api';
import errorMiddleware from '../api/middlewares/error';
import cors from 'cors';
export default async ({ app }: { app: Application }) => {
    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use('/service/api', router());
    app.use(errorMiddleware);
};
