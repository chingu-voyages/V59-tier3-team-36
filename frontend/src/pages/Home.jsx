// src/pages/Home.jsx
import Button from "../components/Button";
import Card from "../components/Card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold py-2">
          Practice Interview Questions
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl text-green-600 font-bold">
          Anytime
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-500 pt-2 pb-6 md:pb-10 max-w-2xl mx-auto">
          Prepare for your next role with quizzes for interview practice. Choose
          your role and master the questions that matter.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid gap-4 md:gap-6 md:grid-cols-3 mt-4 md:mt-8">
        <Card
          icon={<CheckCircle className="text-green-600" size={32} />}
          title="Multiple Questions"
          description="Practice questions tailored for Scrum Masters, Product Owners, Developers, and Designers"
        />
        <Card
          icon={<CheckCircle className="text-green-600" size={32} />}
          title="Instant feedback"
          description="Get immediate feedback on your answers with up to 2 attempts per question"
        />
        <Card
          icon={<CheckCircle className="text-green-600" size={32} />}
          title="Track Progress"
          description="View detailed summaries and statistics after completing each session"
        />
      </div>

      {/* CTA */}
      <div className="flex items-center justify-center mt-6 md:mt-8">
        <Button
          buttonText="Get Started"
          icon={<ArrowRight />}
          onButtonClick={() => navigate("/roles")}
        />
      </div>

      {/* What you'll get */}
      <div className="bg-emerald-50 rounded-lg p-4 md:p-6 mt-6 md:mt-8 border border-emerald-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
          What You'll Get:
        </h3>

        <ul className="space-y-2 text-sm sm:text-base text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Curated interview questions for each Chingu role</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Multiple choice format with detailed explanations</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Performance tracking and statistics</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Practice as many times as you need to build confidence</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
