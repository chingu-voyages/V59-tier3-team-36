// src/pages/__tests__/Questions.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Questions from "../../pages/Questions";

// mock react-router
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: () => [
      {
        get: (key) => (key === "role" ? "Scrum Product Owner" : null),
      },
    ],
    Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  };
});

// mock react-query to control the returned data
vi.mock("@tanstack/react-query", () => ({
  useQuery: () => ({
    data: [
      {
        question: "What should the Product Owner prioritize?",
        options: {
          A: "Ask the Lead Developer which ones are easiest to code",
          B:
            "Choose the features that deliver the highest value to the customer right now",
          C: "Pick the features requested by the most senior manager",
          D: "Randomly select three to keep it fair",
        },
      },
    ],
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

// mock Button so tests don't depend on custom Button implementation
vi.mock("../../components/Button", () => ({
  default: ({ buttonText, onButtonClick, disabled }) => (
    <button onClick={onButtonClick} disabled={disabled}>
      {buttonText}
    </button>
  ),
}));
//test suite
describe("Questions page", () => {
  it("renders the question text and options from an options object", () => {
    render(<Questions />);

    // question text shows
    expect(
      screen.getByText("What should the Product Owner prioritize?")
    ).toBeInTheDocument();

    // options show
    expect(screen.getByText(/A\./)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Choose the features that deliver the highest value to the customer right now"
      )
    ).toBeInTheDocument();
  });
});
