//src/pages/Questions.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/Button";
import { fetchQuestionsByRole } from "@/api/questions";
//shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Questions() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "";
}
