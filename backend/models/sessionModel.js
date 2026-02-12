import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    selectedOption: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    attemptsLeft: { type: Number, required: true },
  },
  { _id: false }
);

const sessionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  role: { type: String, required: true },
  answers: { type: [answerSchema], default: [] }, //changed from required: true to default:[] to allow for cases where this is no answer in the beginning of session
});

const Sessions =
  mongoose.models.Sessions || mongoose.model("Sessions", sessionSchema); //OR ensures the Sessions model exists exactly once
export default Sessions;
