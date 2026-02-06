import { Trophy, CheckCircle, XCircle, RotateCcw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const results = {
  totalQuestions: 5,
  correctCount: 3,
  incorrectCount: 2,
  correctPercentage: 60,
  incorrectPercentage: 40,
};

const message = () => {
  if (results.correctPercentage >= 90) return "Outstanding! 🌟";
  if (results.correctPercentage >= 75) return "Great job! 👏";
  if (results.correctPercentage >= 60) return "Good effort! 💪";
  return "Keep practicing! 📚";
};

export default function Results() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 flex items-center justify-center flex-col">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-emerald-100 rounded-full p-3">
          <Trophy className="size-8 text-emerald-600" />
        </div>
        <h2 className="font-bold text-3xl m-3 text-gray-900">Quiz Complete!</h2>
        <p className="text-lg text-gray-600">
          Here's how you did on the UI/UX Designer questions
        </p>
      </div>
      <div className="my-5 bg-white border border-gray-500 rounded-lg m-5 p-5 flex items-center flex-col w-full max-w-3/4">
        <div className="text-center">
          <div className="text-red-500 text-5xl font-bold mb-3">
            {results.correctPercentage}%
          </div>
          <div className="text-gray-600 text-xl">{message()}</div>
        </div>
        <div className="w-full flex flex-col md:flex-row mt-5 gap-5 justify-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex gap-3">
              <CheckCircle className="size-6 text-green-600" />
              <p className="text-green-900 text-sm">Correct Answers</p>
            </div>
            <div>
              <div className="text-green-900 font-bold text-3xl">
                {results.correctCount}
              </div>
              <div className="text-green-700 text-sm">
                {results.correctPercentage}% of total
              </div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex gap-3">
              <XCircle className="size-6 text-red-600" />
              <p className="text-red-900 text-sm">Incorrect Answers</p>
            </div>
            <div>
              <div className="text-red-900 font-bold text-3xl">
                {results.incorrectCount}
              </div>
              <div className="text-red-700 text-sm">
                {results.incorrectPercentage}% of total
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <button className="cursor-pointer flex bg-white border-gray-300 border rounded-lg p-3" onClick={() => navigate("/roles")}>
          <RotateCcw /> Try Again
        </button>
        <button className="cursor-pointer flex bg-green-500 rounded-lg text-white p-3" onClick={() => navigate("/")}>
          <Home /> Back to Home
        </button>
      </div>
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center mt-8">
        <p className="text-emerald-900 mb-3 font-bold">
          Read to improve your score?
        </p>
        <p className="text-emerald-800 text-sm">
          Practice makes perfect! Try again or explore questions for other
          roles.
        </p>
      </div>
    </div>
  );
}
