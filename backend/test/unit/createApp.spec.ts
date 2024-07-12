import { Application } from 'express';
import createApp from '../../src/app';
function isExpressApplication(app: any): app is Application {
    // Check if app matches express.Application interface
    return app && typeof app === 'function' && typeof app.use === 'function';
}
describe('createApp test', () => {
    it('should create an express app', async () => {
        const app = await createApp();
        expect(app).toBeDefined();
        expect(isExpressApplication(app)).toBe(true);
    });
});
