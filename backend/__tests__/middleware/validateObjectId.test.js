import { describe, it, jest, expect } from '@jest/globals';

const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
const next = jest.fn();

describe('validateObjectId middleware', () => {

    it('should call next() for valid ObjectId', async () => {
        const req = { params: { id: '698487d73563449752e4d832' } }
        const { validateObjectId } = await import('../../middleware/validateObjectId.js');
        const middleware = validateObjectId('id');

        middleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('should return 400 for invalid ObjectId', async () => {
        const req = { params: { id: '698487d735634452e4d832' } }
        const { validateObjectId } = await import('../../middleware/validateObjectId.js');
        const middleware = validateObjectId('id');

        middleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or missing ObjectId for parameter \'id\'' });
    })
});