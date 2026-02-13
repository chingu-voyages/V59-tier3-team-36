import { Trophy, CheckCircle, XCircle, RotateCcw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSummary } from "../api/summary";

const dummyData = {
  totalQuestions: 0,
  correctCount: 0,
  incorrectCount: 0,
  correctPercentage: 0,
  incorrectPercentage: 0,
};

// THIS COMPONENT REQUIRES "role", "sessionId"
export default function Summary({ role, sessionId }) {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({});

  // fetch summary data from API
  useEffect(() => {
    const getSummary = async () => {
      // IF COMPONENT DOESN'T RECEIVE sessionId, POPULATE WITH dummyData
      if (!sessionId) {
        setSummary(dummyData);
        return;
      }

      try {
        const data = await fetchSummary(sessionId);
        setSummary(data);
      } catch (error) {
        console.error("Couldn't fetch summary", error);
      }
    };
    getSummary();
  }, [sessionId]);

  // choose the main percent color based on data
  const percentColor = () => {
    if (summary.correctPercentage >= 75) return "text-emerald-600";
    if (summary.correctPercentage >= 60) return "text-teal-600";
    return "text-orange-600";
  };

  //choose the message to display based on data
  const message = () => {
    if (summary.correctPercentage >= 90) return "Outstanding! 🌟";
    if (summary.correctPercentage >= 75) return "Great job! 👏";
    if (summary.correctPercentage >= 60) return "Good effort! 💪";
    return "Keep practicing! 📚";
  };

  // return to start of questions
  const tryAgain = () => {
    navigate(`/questions?role=${encodeURIComponent(role)}`);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-emerald-100 rounded-full p-3">
          <Trophy className="size-8 text-emerald-600" />
        </div>
        <h2 className="font-bold text-3xl m-3 text-gray-900">Quiz Complete!</h2>
        <p className="text-lg text-gray-600">
          Here's how you did on the {role} questions
        </p>
      </div>
      <div className="my-5 bg-white border border-gray-300 rounded-lg m-5 p-5 flex items-center flex-col">
        <div className="text-center">
          <div className={`text-5xl font-bold mb-3 ${percentColor()}`}>
            {summary.correctPercentage}%
          </div>
          <div className="text-gray-600 text-xl">{message()}</div>
        </div>
        <div className="w-full flex flex-col md:flex-row mt-5 gap-5 justify-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex-1">
            <div className="flex gap-3">
              <CheckCircle className="size-6 text-green-600" />
              <p className="text-green-900 text-sm">Correct Answers</p>
            </div>
            <div>
              <div className="text-green-900 font-bold text-3xl">
                {summary.correctCount}
              </div>
              <div className="text-green-700 text-sm">
                {summary.correctPercentage}% of total
              </div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex-1">
            <div className="flex gap-3">
              <XCircle className="size-6 text-red-600" />
              <p className="text-red-900 text-sm">Incorrect Answers</p>
            </div>
            <div>
              <div className="text-red-900 font-bold text-3xl">
                {summary.incorrectCount}
              </div>
              <div className="text-red-700 text-sm">
                {summary.incorrectPercentage}% of total
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 flex-col md:flex-row items-center justify-center">
        <button
          className="cursor-pointer flex justify-center bg-white border-gray-300 border rounded-lg p-3 gap-3 md:flex-1"
          onClick={tryAgain}
        >
          <RotateCcw /> Try Again
        </button>
        <button
          className="cursor-pointer flex justify-center bg-green-500 rounded-lg text-white p-3 gap-3 md:flex-1"
          onClick={() => navigate("/")}
        >
          <Home /> Back to Home
        </button>
      </div>
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center mt-8">
        <p className="text-emerald-900 mb-3 font-bold">
          Ready to improve your score?
        </p>
        <p className="text-emerald-800 text-sm">
          Practice makes perfect! Try again or explore questions for other
          roles.
        </p>
      </div>
    </div>
  );
}
