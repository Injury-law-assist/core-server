import { Inject, Service } from 'typedi';
import Repository from '.';
import mysql from 'mysql2/promise';
import { MessageDTO } from '../dto/response/chat';

@Service()
export default class MessageRepository extends Repository {
    constructor(@Inject('pool') pool: mysql.Pool) {
        super(pool);
    }
    async findAllByRoomId({ r_id }: { r_id: number }): Promise<MessageDTO[]> {
        const query = 'SELECT * FROM messages WHERE cr_id = ?';
        return (await this.executeQuery(query, [r_id])) as MessageDTO[];
    }
}
