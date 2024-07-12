import { Application } from 'express';
import request from 'supertest';
import createApp from '../../src/app';

describe('/api/auth test', () => {
    let app: Application;
    let email: any = null;
    let password: any = null;
    beforeAll(async () => {
        app = await createApp();
    });

    it('✅ [POST /auth/join] join', async () => {
        // 현재 날짜와 시간을 포함한 이메일 생성
        const currentDate = new Date()
            .toISOString()
            .replace(/[-T:.]/g, '')
            .slice(0, 14);
        email = `testuser_${currentDate}@example.com`;

        const userData = {
            email: email,
            password: 'password123',
            nickname: 'TestUser',
        };
        console.log(userData);
        password = userData.password;
        const res = await request(app).post('/api/auth/join').send(userData);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('statusCode');

        expect(res.body.message).toBe('가입에 성공하였습니다.');
        expect(res.body.data).toHaveProperty('u_id');
        expect(res.body.data).toHaveProperty('u_email', userData.email);
        expect(res.body.data).toHaveProperty('u_nickname', userData.nickname);
        expect(res.body.data).toHaveProperty('u_password'); // 비밀번호는 반환되면 안 됩니다 (일반적으로).
        expect(res.body.data).toHaveProperty('u_created_at');
        expect(res.body.data).toHaveProperty('u_updated_at');
    });

    it('✅[GET /login] login - 정상', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: email,
            password: password,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('statusCode');

        expect(res.body.message).toBe('로그인에 성공하였습니다.');
        expect(res.body.data).toHaveProperty('refreshToken');
        expect(res.body.data).toHaveProperty('accessToken');
    });

    it('✅[GET /login] login - 아이디 존재x', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'asdasdasd' + email,
                password: password,
            });
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('존재하지 않는 아이디입니다.');
    });

    it('✅[GET /login] login - 비밀번호 불일치', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: email,
                password: password + 'ㅁㅁ',
            });
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('비밀번호가 일치하지 않습니다.');
    });
});
