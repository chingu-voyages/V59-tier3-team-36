import { describe, it, expect } from '@jest/globals';
import mongoose from 'mongoose';

describe('getSessionSummary service', () => {

    it('should return correct summary for given session', async () => {
        const { getSessionSummary } = await import('../../services/sessionService.js');
        const session = {
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

        const summary = getSessionSummary(session);

        expect(summary).toEqual({
            totalQuestions: 5,
            correctCount: 3,
            incorrectCount: 2,
            correctPercentage: 60,
            incorrectPercentage: 40
        });
    });
})