import { Application } from 'express';
import expressLoader from './express';
import mysqlLoader from './mysql';
import dependencyInjectionLoader from './dependency-injection';
export default async ({ app }: { app: Application }) => {
    const pool = await mysqlLoader();
    console.log('promise mysql2 loaded successfully 😊');

    await dependencyInjectionLoader(pool);
    console.log('DI loaded successfully 😊');

    await expressLoader({ app });
    console.log('express loaded successfully 😊');
};
