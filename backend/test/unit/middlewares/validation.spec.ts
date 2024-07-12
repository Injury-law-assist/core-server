import { Request, Response, NextFunction } from 'express';
import { ValidationMiddleware } from '../../../src/api/middlewares/validation';
describe('Validation Middleware', () => {
    let validationMiddleware: ValidationMiddleware;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNextFunction: NextFunction;

    beforeEach(() => {
        validationMiddleware = new ValidationMiddleware();
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as Partial<Response>;
        mockNextFunction = jest.fn();
    });

    it('should validate user login data correctly', async () => {
        const validData = {
            email: 'test@example.com',
            password: 'password',
        };
        mockRequest.body = validData;

        await validationMiddleware.validateUserLogin(mockRequest as Request, mockResponse as Response, mockNextFunction);

        expect(mockNextFunction).toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return 400 error for invalid user login data', async () => {
        const invalidData = {
            email: 'invalid-email', // invalid email format
            password: '', // empty password
        };
        mockRequest.body = invalidData;

        await validationMiddleware.validateUserLogin(mockRequest as Request, mockResponse as Response, mockNextFunction);

        expect(mockNextFunction).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: expect.any(String),
        });
    });

    it('should validate user join data correctly', async () => {
        const validData = {
            email: 'test@example.com',
            password: 'password',
            nickname: 'nickname',
        };
        mockRequest.body = validData;

        await validationMiddleware.validateUserJoin(mockRequest as Request, mockResponse as Response, mockNextFunction);

        expect(mockNextFunction).toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return 400 error for invalid user join data', async () => {
        const invalidData = {
            email: 'invalid-email', // invalid email format
            password: '', // empty password
            nickname: '', // empty nickname
        };
        mockRequest.body = invalidData;

        await validationMiddleware.validateUserJoin(mockRequest as Request, mockResponse as Response, mockNextFunction);

        expect(mockNextFunction).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: expect.any(String),
        });
    });
});
