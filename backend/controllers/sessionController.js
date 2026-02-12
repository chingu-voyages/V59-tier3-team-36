import { findSessionById, getSessionSummary, insertSession } from "../services/sessionService.js";
import CustomError from "../utils/CustomError.js";

export const getSummary = async (req, res) => {
    const { id } = req.params;

    try {
        const session = await findSessionById(id);

        if (!session) {
            return res.status(404).json({ message: `Session with id ${id} not found` });
        }

        const summary = getSessionSummary(session);
        res.status(200).json(summary);
    } catch (error) {
        console.log(`Error in getting session summary: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }

}

export const createSession = async (req, res, next) => {
    try {
        const role = req.body?.role;

        if (!role) return next(new CustomError("Role is required", 400));
        
        const createdSessionId = await insertSession(role);

        res.status(201).json({ _id: createdSessionId })
    } catch (error) {
        next(error);
    }
}