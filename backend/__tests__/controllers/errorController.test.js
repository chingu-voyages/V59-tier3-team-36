import { describe, it, jest, expect } from "@jest/globals";
import CustomError from "../../utils/CustomError";

const req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};
const next = jest.fn();

const { handleError } = await import("../../controllers/errorController.js");

describe("errorController", () => {

    describe("handleError", () => {
        // 400
        it('should send formatted error response', () => {
            const error = new CustomError("Role is required", 400);

            handleError(error, req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Role is required"
            });
        })
    })
})