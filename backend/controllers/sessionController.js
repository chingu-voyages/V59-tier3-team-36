import {
  findSessionById,
  getSessionSummary,
  submitAnswerAttempt,
  insertSession,
} from "../services/sessionService.js";
import CustomError from "../utils/CustomError.js";

export const getSummary = async (req, res) => {
  const { id } = req.params;

  try {
    const session = await findSessionById(id);

    if (!session) {
      return res
        .status(404)
        .json({ message: `Session with id ${id} not found` });
    }

    const summary = getSessionSummary(session);
    res.status(200).json(summary);
  } catch (error) {
    console.log(`Error in getting session summary: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};
export const createSession = async (req, res, next) => {
  try {
    const role = req.body?.role;

    if (!role) return next(new CustomError("Role is required", 400));

    const createdSessionId = await insertSession(role);

    res.status(201).json({ _id: createdSessionId });
  } catch (error) {
    next(error);
  }
};

/**POST /api/sessions/:sessionId/answers */
export const submitAnswer = async (req, res) => {
  const { sessionId } = req.params;
  const { questionId, selectedOption } = req.body;
  //validate frontend request; bad request if questionId or selectedOption are missing
  if (!questionId || !selectedOption) {
    return res.status(400).json({
      message: "questionId and selectedOption are required",
    });
  }
  try {
    const result = await submitAnswerAttempt({
      sessionId,
      questionId,
      selectedOption,
    });
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "SESSION_NOT_FOUND") {
      return res.status(404).json({ message: "Session not found" });
    }
    if (error.message === "QUESTION_NOT_FOUND") {
      return res.status(404).json({ message: "Question not found" });
    }
    //bad request
    if (error.message === "INVALID_OPTION") {
      return res.status(400).json({ message: "Invalid selected option" });
    }
    console.log("Error submitting answer:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
