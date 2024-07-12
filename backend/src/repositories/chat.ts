import mysql from 'mysql2/promise';
import { Inject, Service } from 'typedi';
import { ChatRoomDTO } from '../dto/response/chat';
import Repository from '.';

@Service()
export default class ChatRepository extends Repository {
    constructor(@Inject('pool') pool: mysql.Pool) {
        super(pool);
    }

    async findAllByUid({ u_id }: { u_id: number }): Promise<ChatRoomDTO[]> {
        const query = 'SELECT * FROM chatRooms WHERE u_id = ?';
        return (await this.executeQuery(query, [u_id])) as ChatRoomDTO[];
    }

    async findOneByRoomId({ r_id }: { r_id: number }): Promise<ChatRoomDTO> {
        const query = 'SELECT * FROM chatRooms WHERE cr_id = ? limit 1';
        return (await this.executeQuery(query, [r_id]))[0];
    }
    async create({ u_id, title }: { u_id: number; title: string }) {
        const query = 'INSERT INTO chatRooms (title, u_id) VALUES (?, ?)';
        try {
            return await this.executeQuery(query, [title, u_id]);
        } catch (error) {
            console.error(`Error generating chat room: ${error}`);
            throw error;
        }
    }

    async delete({ r_id }: { r_id: number }) {
        const query = 'DELETE FROM chatRooms WHERE cr_id = ?';
        try {
            await this.executeQuery(query, [r_id]);
            return 'success';
        } catch (error) {
            console.error(`Error deleting chat room: ${error}`);
            throw error;
        }
    }
}
