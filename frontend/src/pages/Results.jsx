import { Trophy } from "lucide-react"

export default function Results() {
  return (
    <div>
      <div>
        <div className="bg-emerald-100 rounded-full">
          <Trophy className="size-8 text-emerald-600" />
        </div>
        <h2>Quiz Complete!</h2>
          <p>Here's how you did on the UI/UX Designer questions</p>
      </div>
      <div>
        <div>
          <div>40%</div>
          <div>Keep practicing! 📚</div>
        </div>
        <div>
          <div>
            <div>Correct Answers</div>
            <div>
              <div>2</div>
              <div>40% of total</div>
            </div>
          </div>
          <div>
            <div>Incorrect Answers</div>
            <div>
              <div>3</div>
              <div>60% of total</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button>Try Again</button>
        <button>Back to Home</button>
      </div>
      <div>
        <p>Read to improve your score?</p>
        <p>Practice makes perfect!  Try again or explore questions for other roles.</p>
      </div>
    </div>
  )
}
