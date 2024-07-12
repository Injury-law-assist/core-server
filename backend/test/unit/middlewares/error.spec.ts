import { Request, Response, NextFunction } from 'express';
import errorHandler from '../../../src/api/middlewares/error';

describe('Error Handler Middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as Partial<Response>;
        mockNext = jest.fn();
    });

    it('should handle errors and respond with 500 Internal Server Error', () => {
        const mockError = new Error('Test error message');
        errorHandler(mockError, mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Internal Server Error',
            error: 'Test error message',
        });
    });
});
