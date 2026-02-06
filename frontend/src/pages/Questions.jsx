// src/pages/Questions.jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/Button";
import { fetchQuestionsByRole } from "../api/questions";

// shadcn
import { Card, CardContent } from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

export default function Questions() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "";

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [attemptsUsed, setAttemptsUsed] = useState(0);

  const MAX_ATTEMPTS = 2;

  useEffect(() => {
    console.log("[Questions] role param:", role);
  }, [role]);

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
  const canSubmit = !!selected && !outOfAttempts;
  const canNext = attemptsUsed > 0 && index < total - 1;

  const onSubmit = () => {
    if (!canSubmit) return;
    setAttemptsUsed((prev) => prev + 1);
  };

  const onNext = () => {
    if (!canNext) return;
    setIndex((prev) => prev + 1);
    setSelected("");
    setAttemptsUsed(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{role}</h2>
          <p className="text-gray-600">Select the best answer.</p>
        </div>
        <p className="text-gray-600">
          Question <span className="font-semibold">{number}</span> of{" "}
          <span className="font-semibold">{total}</span>
        </p>
      </div>

      {/* Flashcard */}
      <Card>
        <CardContent className="space-y-5">
          <p className="text-lg font-semibold text-gray-900">{questionText}</p>

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

          {/* Attempts / status */}
          <div className="flex items-center justify-between gap-4">
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

            <div className="flex items-center gap-3">
              <Button
                buttonText="Submit Answer"
                onButtonClick={onSubmit}
                disabled={!canSubmit}
              />

              {index < total - 1 ? (
                <Button
                  buttonText="Next Question"
                  onButtonClick={onNext}
                  disabled={!canNext}
                />
              ) : (
                <Button
                  buttonText="Finish"
                  onButtonClick={() =>
                    console.log("[Questions] finish clicked")
                  }
                  disabled={attemptsUsed === 0}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Link className="text-[#079669] underline" to="/roles">
        Back to Roles
      </Link>
    </div>
  );
}
