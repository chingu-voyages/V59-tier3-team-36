import { describe, it, jest, expect } from '@jest/globals';
import mongoose from 'mongoose';
import CustomError from '../../utils/CustomError.js';

jest.unstable_mockModule('../../services/sessionService.js', () => ({
    findSessionById: jest.fn(),
    getSessionSummary: jest.fn(),
    insertSession: jest.fn()
}));

const { getSummary, createSession } = await import('../../controllers/sessionController.js');
const { findSessionById, getSessionSummary, insertSession } = await import('../../services/sessionService.js');

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};

describe('sessionController', () => {

    describe('getSummary', () => {

        const req = {
            params: {
                id: '698487d73563449752e4d832'
            }
        };

        it('should return 404 if session not found', async () => {
            findSessionById.mockResolvedValue(null);

            await getSummary(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: `Session with id ${req.params.id} not found` });
        });

        it('should return 500 on service error', async () => {
            findSessionById.mockRejectedValue(new Error('Service error'));

            await getSummary(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
        });

        it('should return 200 with session summary when successful', async () => {
            const mockSession =
            {
                _id: new mongoose.Types.ObjectId('698487d73563449752e4d832'),
                role: 'Scrum Master',
                answers: [
                    {
                        questionId: '697a279e93bb4b22405917e5',
                        isCorrect: true,
                        attemptsLeft: 2,
                        selectedOption: 'B'
                    },
                    {
                        isCorrect: false,
                        attemptsLeft: 0,
                        selectedOption: 'A',
                        questionId: '697a279e93bb4b22405917e6'
                    },
                    {
                        isCorrect: true,
                        attemptsLeft: 1,
                        selectedOption: 'C',
                        questionId: '697a279e93bb4b22405917e7'
                    },
                    {
                        isCorrect: true,
                        attemptsLeft: 2,
                        selectedOption: 'B',
                        questionId: '697a279e93bb4b22405917e8'
                    },
                    {
                        isCorrect: false,
                        attemptsLeft: 0,
                        selectedOption: 'B',
                        questionId: '697a279e93bb4b22405917e8'
                    }
                ]
            };

            const mockSummary = {
                totalQuestions: 5,
                correctCount: 3,
                incorrectCount: 2,
                correctPercentage: 60,
                incorrectPercentage: 40
            };

            findSessionById.mockResolvedValue(mockSession);
            getSessionSummary.mockReturnValue(mockSummary);

            await getSummary(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSummary);
        });
    });

    describe('createSession', () => {
        const next = jest.fn();
        // Ok 201
        it('should return status 201 with the created session id if role exists', async () => {
            const req = {
                body: {
                    role: "Scrum Master"
                }
            };
            insertSession.mockResolvedValue("697a279e93bb4b22405917db");

            await createSession(req, res, next)

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ _id: '697a279e93bb4b22405917db' });
        });

        it('should call next with error if role is undefined', async () => {
            const req = { body: {} };

            await createSession(req, res, next);

            expect(next).toHaveBeenCalledWith(new CustomError("Role is required", 400));

        });

        it('should call next with error if role does not exist', async () => {
            const req = { body: { role: "Scrum Masterr" } };
            const mockedError = new CustomError(`Could not create a session: the role Scrum Masterr does not exist.`, 404);

            insertSession.mockRejectedValue(mockedError);
            await createSession(req, res, next);

            expect(next).toHaveBeenCalledWith(mockedError)

        })

        it('should call next with error in case of server error', async () => {
            const req = { body: { role: "Scrum Master" } };
            const mockedError = new Error("Server error");

            insertSession.mockRejectedValue(mockedError);

            await createSession(req, res, next);
            expect(next).toHaveBeenCalledWith(mockedError)
        })
    })
});