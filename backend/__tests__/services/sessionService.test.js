import { describe, expect, it, jest } from "@jest/globals";
import mongoose from "mongoose";

jest.unstable_mockModule(
    '../../services/roleService.js', () => ({
        findRoleByName: jest.fn()
    }));

jest.unstable_mockModule(
    '../../models/sessionModel.js', () => ({
        default: {
            create: jest.fn(),
            findById: jest.fn()
        }
    })
);

const { findRoleByName } = await import('../../services/roleService.js');
const { findSessionById, insertSession } = await import("../../services/sessionService.js");
const { default: Sessions } = await import("../../models/sessionModel.js");

describe("sessionService", () => {

    describe('findSessionById service', () => {

        it('should return null when session does not exist', async () => {
            Sessions.findById.mockResolvedValue(null);

            const session = await findSessionById('698487d73563449752e4d832');
            expect(session).toBeNull();
        });

        it('should return session object when session exists', async () => {
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

            Sessions.findById.mockResolvedValue(mockSession);

            const session = await findSessionById('698487d73563449752e4d832');
            expect(session).toEqual(mockSession);
        });
    });

    describe("insertSession", () => {

        it("should throw an error if role does not exist", async () => {
            // Dependency on findRoleByName service
            findRoleByName.mockResolvedValue(null);

            await expect(insertSession("Scrum"))
                .rejects
                .toMatchObject({
                    message: `Could not create a session: the role Scrum does not exist.`,
                    statusCode: 400
                })
        });

        it("should create the session and return its id if the role exists", async () => {
            const mockedRole = {
                _id: '697a279e93bb4b22405917db',
                name: 'Scrum Master',
                focus: 'Servant leadership, coaching, removing impediments (Aligns with CSM)',
                questionCount: 5,
                __v: 0,
                createdAt: '2026-01-28T15:13:34.040Z',
                updatedAt: '2026-01-28T15:13:34.040Z'
            }
            const mockedCreatedSession = {
                _id: '698c792a376aacebf4bca1e9',
                role: 'Scrum Master',
                answers: [],
                __v: 0
            };

            findRoleByName.mockResolvedValue(mockedRole);
            Sessions.create.mockResolvedValue(mockedCreatedSession);

            const sessionId = await insertSession("Scrum Master");

            expect(sessionId).toBe("698c792a376aacebf4bca1e9");
        })
    });

})