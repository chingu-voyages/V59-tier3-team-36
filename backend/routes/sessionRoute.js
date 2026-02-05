import { Router } from "express";
import { getSummary } from "../controllers/sessionController.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const router = Router();

router.get("/:id/summary", validateObjectId("id"), getSummary);

export default router;