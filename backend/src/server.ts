import createApp from './app';
import http from 'http';

(async function serverStart() {
    const app = await createApp();
    http.createServer(app).listen(8000, () => {
        console.log('Server started on port 8000');
    });
})();
