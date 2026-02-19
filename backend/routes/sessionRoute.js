import { Router } from "express";
import {
  getSummary,
  submitAnswer,
  createSession,
} from "../controllers/sessionController.js";

import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

//GET /api/sessions/:id/summary
router.get("/:id/summary", validateObjectId("id"), getSummary);
router.post("/", createSession);

//POST /api/sessions/:sessionId/answers
router.post("/:sessionId/answers", validateObjectId("sessionId"), submitAnswer);

export default router;
