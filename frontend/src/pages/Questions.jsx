// src/pages/Questions.jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/Button";
import { fetchQuestionsByRole, submitAnswer } from "../api/questions";
import InfoIcon from "../components/icons/InfoIcon";

// shadcn
import { Card, CardContent } from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Progress } from "../components/ui/progress";
import Summary from "../components/Summary";

export default function Questions() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "";
  const sessionId = searchParams.get("sessionId") || "";
  const restart = searchParams.get("restart");

  const [index, setIndex] = useState(() => {
    const saved = sessionStorage.getItem("quizIndex");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [selected, setSelected] = useState("");
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [feedback, setFeedback] = useState(null); // { isCorrect, feedbackMessage, rationale }

  const MAX_ATTEMPTS = 2;

  // Persist index to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("quizIndex", index);
  }, [index]);

  // Persist sessionId to sessionStorage
  useEffect(() => {
    if (sessionId) {
      sessionStorage.setItem("quizSessionId", sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    console.log("[Questions] role param:", role);
  }, [role]);

  // "try again" button useEffect functionality 
  useEffect(() => {
    if (restart) {
      setShowSummary(false);
      setIndex(0);
      setSelected("");
      setAttemptsUsed(0);
      setFeedback(null);
      sessionStorage.removeItem("quizIndex");
      sessionStorage.removeItem("quizSessionId");
    }
  }, [restart]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["questions", role],
    queryFn: () => fetchQuestionsByRole(role),
    enabled: !!role,
  });

  useEffect(() => {
    if (!role) return;
    setIndex(0);
    setSelected("");
    setAttemptsUsed(0);
  }, [role]);

  if (isLoading) return <p className="text-gray-600">Loading questions...</p>;

  if (isError) {
    return (
      <div className="space-y-2">
        <p className="text-red-600 font-semibold">Error loading questions</p>
        <p className="text-gray-600">{error?.message}</p>
        <Link className="text-[#079669] underline" to="/roles">
          Back to Roles
        </Link>
      </div>
    );
  }

  const questions = Array.isArray(data) ? data : [];
  if (questions.length === 0) {
    return (
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">{role}</h2>
        <p className="text-gray-600">No questions available for this role</p>
        <Link className="text-[#079669] underline" to="/roles">
          Back to Roles
        </Link>
      </div>
    );
  }

  const current = questions[index];

  const questionText =
    current?.question ?? current?.prompt ?? current?.text ?? "";

  const options =
    current?.options && typeof current.options === "object"
      ? Object.entries(current.options)
      : [];

  const number = index + 1;
  const total = questions.length;

  const outOfAttempts = attemptsUsed >= MAX_ATTEMPTS;
  const answeredCorrectly = feedback?.isCorrect === true;
  const canSubmit = !!selected && !outOfAttempts && !answeredCorrectly;
  const canNext = (outOfAttempts || answeredCorrectly) && index < total - 1;
  const progressValue = (number / total) * 100;

  const onSubmit = async () => {
    if (!canSubmit) return;
    
    try {
      const result = await submitAnswer(sessionId, current._id, selected);
      setAttemptsUsed(result.attemptsUsed);
      setFeedback({
        isCorrect: result.isCorrect,
        feedbackMessage: result.feedbackMessage,
        rationale: result.rationale,
      });
    } catch (error) {
      console.error('Failed to submit answer:', error);
      setAttemptsUsed((prev) => prev + 1);
      setFeedback(null);
    }
  };

  const onNext = () => {
    if (!canNext) return;
    setIndex((prev) => prev + 1);
    setSelected("");
    setAttemptsUsed(0);
    setFeedback(null);
  };

  const onFinish = () => {
    console.log("[Questions] finish clicked");
    setShowSummary(true);
  };

  // show summary component when quiz is finished
  if (showSummary) {
    return <Summary role={role} sessionId={sessionId} />;
  }

  return (
    <div className="space-y-6">
      {/*Role title, question count*/}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{role}</h2>
        <p className="text-sm text-gray-600">
          Question <span className="font-semibold">{number}</span> of{" "}
          <span className="font-semibold">{total}</span>
        </p>
      </div>

      {/*Progress bar*/}
      <Progress value={progressValue} className="w-full h-2" />

      {/*Flashcard*/}
      <div className="w-full max-w-[640px]">
        <Card className="w-full">
          <CardContent className="space-y-5">
            <p className="text-lg font-semibold text-gray-900 break-words">
              {questionText}
            </p>

            {/*Instructions*/}
            <p className="text-gray-600">
              Select the best answer from the options below
            </p>

            <RadioGroup
              value={selected}
              onValueChange={setSelected}
              className="space-y-3"
            >
              {options.map(([key, text]) => {
                const active = selected === key;

                return (
                  <label
                    key={key}
                    className={`flex items-center gap-3 rounded-lg border p-4 transition
                    ${
                      active
                        ? "bg-emerald-50 border-emerald-300"
                        : "bg-white border-gray-200"
                    }
                    ${
                      outOfAttempts
                        ? "opacity-60 cursor-not-allowed"
                        : "cursor-pointer hover:bg-emerald-50"
                    }`}
                  >
                    <RadioGroupItem value={key} disabled={outOfAttempts} />
                    <span className="text-gray-900">
                      <strong>{key}.</strong> {text}
                    </span>
                  </label>
                );
              })}
            </RadioGroup>

            {/*Attempts/status*/}
            <div className="flex items-center gap-2">
              <InfoIcon className="w-5 h-5 text-gray-500 shrink-0" />

              {outOfAttempts ? (
                <p className="text-sm font-semibold text-red-600">
                  Out of attempts
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Attempts used:{" "}
                  <span className="font-semibold text-gray-900">
                    {attemptsUsed}
                  </span>{" "}
                  of {MAX_ATTEMPTS}
                </p>
              )}
            </div>

            {/*Feedback and rationale*/}
            {feedback && (
              <div
                className={`rounded-lg p-4 ${
                  feedback.isCorrect
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <p
                  className={`font-semibold ${
                    feedback.isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {feedback.feedbackMessage}
                </p>
                {feedback.rationale && (
                  <p className="text-gray-700 text-sm mt-2">
                    <strong>Rationale:</strong> {feedback.rationale}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/*Action buttons*/}
        <div className="mt-4 flex w-full gap-3">
          <div className="flex-1">
            <Button
              buttonText="Submit Answer"
              onButtonClick={onSubmit}
              disabled={!canSubmit}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            {index < total - 1 ? (
              <Button
                buttonText="Next Question"
                onButtonClick={onNext}
                disabled={!canNext}
                className="w-full"
              />
            ) : (
              <Button
                buttonText="Finish"
                onButtonClick={onFinish}
                disabled={!outOfAttempts && !answeredCorrectly}
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
