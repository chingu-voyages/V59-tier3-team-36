import { jest } from "@jest/globals";

/* Mock ESM*/
jest.unstable_mockModule("../../models/sessionModel.js", () => ({
  default: {
    findById: jest.fn(),
  },
}));

jest.unstable_mockModule("../../models/questionModel.js", () => ({
  default: {
    findById: jest.fn(),
  },
}));

const { default: Sessions } = await import("../../models/sessionModel.js");
const { default: Question } = await import("../../models/questionModel.js");

const { submitAnswerAttempt } = await import(
  "../../services/sessionService.js"
);

// Helpers
const makeOptionsMap = (obj) => new Map(Object.entries(obj));

const makeSession = ({ answers = [] } = {}) => ({
  answers,
  save: jest.fn().mockResolvedValue(true),
});

describe("submitAnswerAttempt (sessionService)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws SESSION_NOT_FOUND when session does not exist", async () => {
    Sessions.findById.mockResolvedValue(null);

    await expect(
      submitAnswerAttempt({
        sessionId: "sess",
        questionId: "q1",
        selectedOption: "A",
      })
    ).rejects.toThrow("SESSION_NOT_FOUND");
  });

  it("throws QUESTION_NOT_FOUND when question does not exist", async () => {
    Sessions.findById.mockResolvedValue(makeSession());
    Question.findById.mockResolvedValue(null);

    await expect(
      submitAnswerAttempt({
        sessionId: "sess",
        questionId: "q1",
        selectedOption: "A",
      })
    ).rejects.toThrow("QUESTION_NOT_FOUND");
  });

  it("throws INVALID_OPTION when selectedOption is not in question.options", async () => {
    Sessions.findById.mockResolvedValue(makeSession());
    Question.findById.mockResolvedValue({
      _id: "q1",
      options: makeOptionsMap({ A: "x", B: "y" }),
      answer: "B",
      rationale: "because",
    });

    await expect(
      submitAnswerAttempt({
        sessionId: "sess",
        questionId: "q1",
        selectedOption: "Z",
      })
    ).rejects.toThrow("INVALID_OPTION");
  });

  it("first wrong attempt: creates entry, decrements attemptsLeft, returns try-again feedback", async () => {
    const session = makeSession({ answers: [] });

    Sessions.findById.mockResolvedValue(session);
    Question.findById.mockResolvedValue({
      _id: "q1",
      options: makeOptionsMap({ A: "x", B: "y" }),
      answer: "B",
      rationale: "because B",
    });

    const res = await submitAnswerAttempt({
      sessionId: "sess",
      questionId: "q1",
      selectedOption: "A", // wrong
    });

    expect(session.save).toHaveBeenCalledTimes(1);

    // Entry should exist now
    expect(session.answers).toHaveLength(1);
    expect(session.answers[0].questionId).toBe("q1");
    expect(session.answers[0].selectedOption).toBe("A");
    expect(session.answers[0].isCorrect).toBe(false);
    expect(session.answers[0].attemptsLeft).toBe(1); // 2 -> 1

    expect(res).toMatchObject({
      questionId: "q1",
      selectedOption: "A",
      isCorrect: false,
      attemptsUsed: 1,
      attemptsRemaining: 1,
      feedbackMessage: "Incorrect, try again",
      rationale: null,
    });
  });

  it("correct attempt: creates entry, does not decrement attemptsLeft, returns rationale", async () => {
    const session = makeSession({ answers: [] });

    Sessions.findById.mockResolvedValue(session);
    Question.findById.mockResolvedValue({
      _id: "q1",
      options: makeOptionsMap({ A: "x", B: "y" }),
      answer: "B",
      rationale: "because B",
    });

    const res = await submitAnswerAttempt({
      sessionId: "sess",
      questionId: "q1",
      selectedOption: "B", // correct
    });

    expect(session.save).toHaveBeenCalledTimes(1);

    expect(session.answers).toHaveLength(1);
    expect(session.answers[0].attemptsLeft).toBe(2); // unchanged on correct
    expect(session.answers[0].isCorrect).toBe(true);

    expect(res).toMatchObject({
      questionId: "q1",
      selectedOption: "B",
      isCorrect: true,
      attemptsUsed: 0, // 2 - 2
      attemptsRemaining: 2,
      feedbackMessage: "Correct",
      rationale: "because B",
    });
  });

  it("second wrong attempt exhausts attempts: attemptsLeft goes to 0 and returns rationale", async () => {
    const session = makeSession({
      answers: [
        {
          questionId: { toString: () => "q1" },
          selectedOption: "A",
          isCorrect: false,
          attemptsLeft: 1,
        },
      ],
    });

    Sessions.findById.mockResolvedValue(session);
    Question.findById.mockResolvedValue({
      _id: "q1",
      options: makeOptionsMap({ A: "x", B: "y" }),
      answer: "B",
      rationale: "because B",
    });

    const res = await submitAnswerAttempt({
      sessionId: "sess",
      questionId: "q1",
      selectedOption: "A", // wrong again
    });

    expect(session.save).toHaveBeenCalledTimes(1);

    expect(session.answers[0].attemptsLeft).toBe(0);

    expect(res).toMatchObject({
      isCorrect: false,
      attemptsUsed: 2,
      attemptsRemaining: 0,
      feedbackMessage: "Incorrect",
      rationale: "because B", // your rule: reveal after exhausted
    });
  });

  it("locked state: if attemptsLeft is 0, returns current state and does not save", async () => {
    const session = makeSession({
      answers: [
        {
          questionId: { toString: () => "q1" },
          selectedOption: "A",
          isCorrect: false,
          attemptsLeft: 0,
        },
      ],
    });

    Sessions.findById.mockResolvedValue(session);
    Question.findById.mockResolvedValue({
      _id: "q1",
      options: makeOptionsMap({ A: "x", B: "y" }),
      answer: "B",
      rationale: "because B",
    });

    const res = await submitAnswerAttempt({
      sessionId: "sess",
      questionId: "q1",
      selectedOption: "B",
    });

    expect(session.save).not.toHaveBeenCalled();

    expect(res).toMatchObject({
      questionId: "q1",
      selectedOption: "A", // unchanged
      isCorrect: false,
      attemptsRemaining: 0,
      feedbackMessage: "Incorrect",
      rationale: "because B",
    });
  });
});
