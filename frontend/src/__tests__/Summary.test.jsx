import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Summary from "../components/Summary";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock fetchSummary API
vi.mock("../../api/summary", () => ({
  fetchSummary: vi.fn(() =>
    Promise.resolve({
      totalQuestions: 5,
      correctCount: 4,
      incorrectCount: 1,
      correctPercentage: 80,
      incorrectPercentage: 20,
    })
  ),
}));

describe("Summary component", () => {
  it("renders summary with role and session data", async () => {
    render(<Summary role="Scrum Master" sessionId="test-session-123" />);

    // Check if title is displayed
    expect(screen.getByText("Quiz Complete!")).toBeInTheDocument();

    // Check if role is mentioned
    expect(
      screen.getByText(/Here's how you did on the Scrum Master questions/i)
    ).toBeInTheDocument();
  });

  it("navigates to questions with restart parameter when Try Again is clicked", () => {
    render(<Summary role="Web Developer" sessionId="test-session-456" />);

    const tryAgainButton = screen.getByRole('button', { name: /Try Again/i });
    fireEvent.click(tryAgainButton);

    // Check that navigate was called with correct URL
    expect(mockNavigate).toHaveBeenCalledWith(
      "/questions?role=Web%20Developer&restart=true"
    );
  });

  it("navigates to home when Back to Home is clicked", () => {
    render(<Summary role="UI/UX Designer" sessionId="test-session-789" />);

    const homeButton = screen.getByText(/Back to Home/i);
    fireEvent.click(homeButton);

    // Check that navigate was called with home route
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
