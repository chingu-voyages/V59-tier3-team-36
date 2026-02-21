import Sessions from "../models/sessionModel.js";
import Question from "../models/questionModel.js";
//set
const MAX_ATTEMPTS = 2;
import CustomError from "../utils/CustomError.js";
import { findRoleByName } from "./roleService.js";

export const findSessionById = async (sessionId) => {
  const session = await Sessions.findById(sessionId);
  return session;
};

export const insertSession = async (role) => {
  // Check if role exists
  const roleFromDb = await findRoleByName(role);

  if (!roleFromDb)
    throw new CustomError(
      `Could not create a session: the role ${role} does not exist.`,
      400
    );

  // Create new session with initial fields
  const createdSession = await Sessions.create({
    role: roleFromDb.name,
    answers: [],
  });

  return createdSession._id;
};

export const getSessionSummary = (session) => {
  const answers = session.answers ?? [];
  const totalQuestions = answers.length;
  const correctCount = answers.filter((ans) => ans.isCorrect).length;
  const incorrectCount = totalQuestions - correctCount;

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
    correctPercentage:
      totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0,
    incorrectPercentage:
      totalQuestions > 0 ? (incorrectCount / totalQuestions) * 100 : 0,
  };
};

/** service function with answering logic POST/api/sessions/:sessionId/answers */
export const submitAnswerAttempt = async ({
  sessionId,
  questionId,
  selectedOption,
}) => {
  const session = await Sessions.findById(sessionId);
  if (!session) {
    throw new Error("SESSION_NOT_FOUND");
  }

  const question = await Question.findById(questionId);
  if (!question) {
    throw new Error("QUESTION_NOT_FOUND");
  }
  if (!question.options?.has(selectedOption)) {
    throw new Error("INVALID_OPTION");
  }
  let entry = session.answers.find(
    (a) => a.questionId.toString() === questionId
  );
  //create entry if first attempt
  if (!entry) {
    session.answers.push({
      questionId,
      selectedOption: "",
      isCorrect: false,
      attemptsLeft: MAX_ATTEMPTS,
    });
    entry = session.answers[session.answers.length - 1];
  }
  //If already correct or out of attempts then retrun current state
  if (entry.isCorrect || entry.attemptsLeft <= 0) {
    const attemptsRemaining = Math.max(0, entry.attemptsLeft);
    const attemptsUsed = MAX_ATTEMPTS - attemptsRemaining;
    return {
      questionId,
      selectedOption: entry.selectedOption,
      isCorrect: entry.isCorrect,
      attemptsUsed,
      attemptsRemaining,
      feedbackMessage: entry.isCorrect ? "Correct" : "Incorrect",
      rationale:
        entry.isCorrect || attemptsRemaining === 0 ? question.rationale : null,
    };
  }
  //check correctness
  const isCorrect = selectedOption === question.answer;
  entry.selectedOption = selectedOption;
  entry.isCorrect = isCorrect;
  entry.attemptsLeft = Math.max(0, entry.attemptsLeft - 1);

  await session.save();
  const attemptsRemaining = Math.max(0, entry.attemptsLeft);
  const attemptsUsed = MAX_ATTEMPTS - attemptsRemaining;
  let feedbackMessage;
  if (isCorrect) feedbackMessage = "Correct";
  else if (attemptsRemaining > 0) feedbackMessage = "Incorrect, try again";
  else feedbackMessage = "Incorrect";
  return {
    questionId,
    selectedOption,
    isCorrect,
    attemptsUsed,
    attemptsRemaining,
    feedbackMessage,
    rationale: isCorrect || attemptsRemaining === 0 ? question.rationale : null,
  };
};
