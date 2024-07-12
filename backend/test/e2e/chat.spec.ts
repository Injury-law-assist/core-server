import { Application } from 'express';
import request from 'supertest';
import createApp from '../../src/app';

describe('/api/chat test', () => {
    let app: Application;
    let accessToken: string;
    let cr_id: number;
    beforeAll(async () => {
        app = await createApp();
        /** accessToken 획득 */
        const res = await request(app).post('/api/auth/login').send({
            email: 'testuser_20240708100731@example.com',
            password: 'password123',
        });
        accessToken = res.body.data.accessToken;
    });

    it('✅[ GET /messages ] getMessages', async () => {
        const res = await request(app).get('/api/chat/115/messages').set('Authorization', `Bearer ${accessToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', '성공적으로 조회하였습니다.');
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('✅[ GET / ] getChatRoom', async () => {
        const res = await request(app).get('/api/chat').set('Authorization', `Bearer ${accessToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', '성공적으로 조회하였습니다.');
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('✅[ POST / ] joinChatRoom', async () => {
        const res = await request(app).post('/api/chat').set('Authorization', `Bearer ${accessToken}`).send({
            title: '챗봇',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', '정상적으로 채팅방이 생성되었습니다.');
        expect(res.body).toHaveProperty('data');
        cr_id = res.body.data.cr_id;
    });

    it('✅[ DELETE / ] exitChatRoom', async () => {
        const res = await request(app).delete(`/api/chat/${cr_id}`).set('Authorization', `Bearer ${accessToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', '삭제가 완료되었습니다.');
        expect(res.body).not.toHaveProperty('data');
    });
});
