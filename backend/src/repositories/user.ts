import mysql from 'mysql2/promise';
import { Inject, Service } from 'typedi';
import { UserJoinRequestDTO } from '../dto/request/user';
import { UserDTO } from '../dto/response/user';
import Repository from '.';

/**
 * CHECKLIST - AuthRepository
 *  [ ] login 기능 구현
 *  [x] find 함수 따로 만들어서 구현
 *  [x] join 기능 구현
 *  [x] insert 함수로 구현
 */
@Service()
export default class UserRepository extends Repository {
    constructor(@Inject('pool') pool: mysql.Pool) {
        super(pool);
    }
    findOneByPk = async ({ email }: { email: string }): Promise<UserDTO> => {
        const query = 'SELECT * FROM users WHERE u_email = ? limit 1';
        return (await this.executeQuery(query, [email]))[0];
    };
    create = async (user: UserJoinRequestDTO) => {
        const query = 'INSERT INTO users(u_email, u_password, u_nickname) values (?,?,?)';
        return await this.executeQuery(query, [user.email, user.password, user.nickname]);
    };
}
