import { describe, it, jest } from '@jest/globals';
import mongoose from 'mongoose';

jest.unstable_mockModule(
    '../../models/sessionModel.js',
    () => ({
        default: {
            findById: jest.fn(),
        },
    })
);

const { default: Sessions } = await import("../../models/sessionModel.js");
const { findSessionById } = await import('../../services/sessionService.js');

describe('findSessionById service', () => {

    it('should return null when session does not exist', async () => {
        Sessions.findById.mockResolvedValue(null);

        const session = await findSessionById('698487d73563449752e4d832');
        expect(session).toBeNull();
    });

    it('should return session object when session exists', async () => {
        const mockSession = 
            {
                _id: new mongoose.Types.ObjectId('698487d73563449752e4d832') ,
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

        Sessions.findById.mockResolvedValue(mockSession);

        const session = await findSessionById('698487d73563449752e4d832');
        expect(session).toEqual(mockSession);
    });
});



