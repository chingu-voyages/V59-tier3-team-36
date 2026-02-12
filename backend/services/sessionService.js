import Sessions from "../models/sessionModel.js";
import CustomError from "../utils/CustomError.js";
import { findRoleByName } from "./roleService.js";

export const findSessionById = async (sessionId) => {
    const session = await Sessions.findById(sessionId);
    return session;
};

export const insertSession = async (role) => {
    // Check if role exists
    const roleFromDb = await findRoleByName(role);

    if (!roleFromDb) throw new CustomError(`Could not create a session: the role ${role} does not exist.`, 400);

    // Create new session with initial fields
    const createdSession = await Sessions.create({
        role: roleFromDb.name,
        answers: []
    });

    return createdSession._id;
}

export const getSessionSummary = (session) => {
    const answers = session.answers ?? [];
    const totalQuestions = answers.length;
    const correctCount = answers.filter(ans => ans.isCorrect).length;
    const incorrectCount = totalQuestions - correctCount;

    return {
        totalQuestions,
        correctCount,
        incorrectCount,
        correctPercentage: totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0,
        incorrectPercentage: totalQuestions > 0 ? (incorrectCount / totalQuestions) * 100 : 0
    };
}