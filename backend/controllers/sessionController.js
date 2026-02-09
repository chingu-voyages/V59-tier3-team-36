import { findSessionById, getSessionSummary } from "../services/sessionService.js";

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