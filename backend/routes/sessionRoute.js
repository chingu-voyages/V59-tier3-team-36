import { Router } from "express";
import { createSession, getSummary } from "../controllers/sessionController.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

router.get("/:id/summary", validateObjectId("id"), getSummary);
router.post("/", createSession);

export default router;