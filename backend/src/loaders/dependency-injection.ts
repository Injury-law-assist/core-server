import Container from 'typedi';
import mysql from 'mysql2/promise';
export default async (pool: mysql.Pool) => {
    Container.set('pool', pool);
};
