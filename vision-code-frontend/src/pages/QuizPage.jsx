import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  BarChart3,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function calcScore(questions, answers) {
  return questions.reduce((acc, q) => {
    const chosen = q.options.find((o) => o.id === answers[q.id]);
    return acc + (chosen?.is_correct ? 1 : 0);
  }, 0);
}

// ─── Timer Bar ────────────────────────────────────────────────────────────────

function TimerBar({ timeLeft, totalTime }) {
  const pct = Math.max(0, (timeLeft / totalTime) * 100);
  const urgent = pct < 25;
  const warning = pct < 50;

  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${
          urgent ? "bg-red-500" : warning ? "bg-yellow-500" : "bg-blue-600"
        }`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────

function ResultScreen({
  questions,
  answers,
  quizData,
  title,
  timeTaken,
  totalTime,
  onRetry,
  onBack,
}) {
  const score = calcScore(questions, answers);
  const total = questions.length;
  const passed = score >= quizData.passing_marks;
  const pct = Math.round((score / total) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Course
        </button>

        {/* Result Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="text-center mb-8">
            <div
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
                passed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {passed ? (
                <Trophy className="w-10 h-10 text-green-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>

            <h1
              className={`text-3xl font-bold mb-2 ${
                passed ? "text-green-700" : "text-red-700"
              }`}
            >
              {passed ? "Quiz Passed! 🎉" : "Quiz Failed"}
            </h1>
            <p className="text-gray-600 text-sm">{title}</p>
          </div>

          {/* Score Display */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-6xl font-bold text-gray-900">
                  {score}
                </span>
                <span className="text-2xl text-gray-500">/ {total}</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">{pct}%</div>
            </div>

            {/* Score Bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  passed ? "bg-green-500" : "bg-red-500"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-gray-500 text-xs mb-1">Passing Score</p>
                <p className="font-bold text-gray-900">
                  {Math.round((quizData.passing_marks / total) * 100)}%
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-gray-500 text-xs mb-1">Your Score</p>
                <p className="font-bold text-gray-900">{pct}%</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-gray-500 text-xs mb-1">Time Taken</p>
                <p className="font-bold text-gray-900">
                  {formatTime(timeTaken)}
                </p>
              </div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Answer Review
            </h2>
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const chosen = q.options.find((o) => o.id === answers[q.id]);
                const isRight = chosen?.is_correct ?? false;

                return (
                  <div
                    key={q.id}
                    className={`border rounded-lg p-4 transition ${
                      isRight
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {isRight ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="font-semibold text-gray-900 text-sm">
                        Q{idx + 1}. {q.question_text}
                      </p>
                    </div>

                    <div className="space-y-2 ml-8">
                      {q.options.map((opt) => {
                        const isChosen = opt.id === answers[q.id];
                        const isCorrect = opt.is_correct;
                        let bgColor = "bg-white";
                        let borderColor = "border-gray-200";
                        let textColor = "text-gray-700";

                        if (isCorrect) {
                          bgColor = "bg-green-100";
                          borderColor = "border-green-300";
                          textColor = "text-green-800";
                        } else if (isChosen && !isCorrect) {
                          bgColor = "bg-red-100";
                          borderColor = "border-red-300";
                          textColor = "text-red-800";
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`text-xs px-3 py-2 rounded border flex items-center gap-2 ${bgColor} ${borderColor} ${textColor}`}
                          >
                            {isCorrect && (
                              <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                            )}
                            {isChosen && !isCorrect && (
                              <XCircle className="w-3 h-3 text-red-600 flex-shrink-0" />
                            )}
                            {!isCorrect && !isChosen && (
                              <span className="w-3 h-3 flex-shrink-0" />
                            )}
                            {opt.option_text}
                          </div>
                        );
                      })}
                      {!chosen && (
                        <p className="text-xs text-yellow-700 flex items-center gap-1 mt-2">
                          <AlertCircle className="w-3 h-3" />
                          Not answered
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Course
            </button>
            <button
              onClick={onRetry}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Retry Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Quiz Page ───────────────────────────────────────────────────────────

export default function QuizPage() {
  const { quizItemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state;
  const quizData = locationState?.quizData ?? null;
  const title = locationState?.title ?? "Quiz";
  const courseId = locationState?.courseId;
  const totalTime = (locationState?.estimatedMinutes ?? 10) * 60;

  // ── State ──────────────────────────────────────────────────────────────────

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [timeTaken, setTimeTaken] = useState(0);
  const [started, setStarted] = useState(false);
  const timerRef = useRef(null);

  const questions = quizData?.questions ?? [];

  // ── Timer ──────────────────────────────────────────────────────────────────

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!started || submitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          setTimeTaken(totalTime);
          setSubmitted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return stopTimer;
  }, [started, submitted, stopTimer, totalTime]);

  const handleSubmit = () => {
    stopTimer();
    setTimeTaken(totalTime - timeLeft);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentIdx(0);
    setTimeLeft(totalTime);
    setTimeTaken(0);
    setStarted(true);
  };

  const handleBack = () => {
    navigate(courseId ? `/student/course/${courseId}` : "/student");
  };

  // ── Guard: no quiz data ────────────────────────────────────────────────────

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-bold text-gray-900 mb-4">
            Quiz data not found.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ── Result screen ──────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <ResultScreen
        questions={questions}
        answers={answers}
        quizData={quizData}
        title={title}
        timeTaken={timeTaken}
        totalTime={totalTime}
        onRetry={handleRetry}
        onBack={handleBack}
      />
    );
  }

  // ── Start screen ───────────────────────────────────────────────────────────

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            {title}
          </h1>
          <p className="text-gray-600 text-sm text-center mb-8">
            Ready to test your knowledge?
          </p>

          <div className="space-y-3 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <span className="text-sm text-gray-600 font-medium">
                Questions
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {questions.length}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <span className="text-sm text-gray-600 font-medium">
                Time Limit
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {formatTime(totalTime)}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <span className="text-sm text-gray-600 font-medium">
                Passing Score
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {quizData.passing_marks}/{quizData.total_marks}
              </span>
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition mb-3"
          >
            Start Quiz
          </button>
          <button
            onClick={handleBack}
            className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ── Quiz screen ────────────────────────────────────────────────────────────

  const currentQ = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const isLast = currentIdx === questions.length - 1;
  const urgent = timeLeft < totalTime * 0.25;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Course
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">{title}</p>
              <h1 className="text-xl font-bold text-gray-900">
                Question {currentIdx + 1} of {questions.length}
              </h1>
            </div>
            <div
              className={`flex items-center gap-2 text-lg font-bold ${
                urgent ? "text-red-600" : "text-gray-900"
              }`}
            >
              <Clock
                className={`w-5 h-5 ${
                  urgent ? "animate-pulse text-red-600" : "text-blue-600"
                }`}
              />
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Timer Bar */}
          <TimerBar timeLeft={timeLeft} totalTime={totalTime} />

          {/* Question Indicators */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(i)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                  i === currentIdx
                    ? "bg-blue-600 text-white"
                    : answers[q.id] !== undefined
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <p className="text-lg font-semibold text-gray-900 mb-6">
            {currentQ.question_text}
          </p>

          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              const selected = answers[currentQ.id] === opt.id;
              const letter = String.fromCharCode(65 + i); // A, B, C...

              return (
                <button
                  key={opt.id}
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQ.id]: opt.id,
                    }))
                  }
                  className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    selected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"
                  }`}
                >
                  <span
                    className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg font-bold text-sm ${
                      selected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-gray-900 font-medium">
                    {opt.option_text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
            className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>

          <div className="flex-1 text-center text-sm text-gray-600 font-medium">
            {answeredCount}/{questions.length} answered
          </div>

          {isLast ? (
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Submit Quiz
            </button>
          ) : (
            <button
              onClick={() =>
                setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))
              }
              className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Early Submit Option */}
        {answeredCount === questions.length && !isLast && (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 underline transition"
            >
              All answered — submit early?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
