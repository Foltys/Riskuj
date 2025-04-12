import { useEffect, useState } from "react";
import { useGameStore } from "../store/gameStore";
import { useNavigate } from "react-router-dom";

interface Question {
  text: string;
  points: number;
}

interface AnswerFeedback {
  correct: boolean;
  answer: string;
}

interface Category {
  id: number;
  name: string;
  questions: Question[];
}

export default function Game() {
  const {
    socket,
    gameId,
    currentPlayerId,
    players,
    categories,
    selectQuestion,
    submitAnswer,
  } = useGameStore();
  const [answerInput, setAnswerInput] = useState("");
  const [error, setError] = useState("");
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswering, setIsAnswering] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<AnswerFeedback | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!socket || !gameId) return;

    socket.on("questionSelected", ({ text, points }) => {
      setCurrentQuestion({ text: text, points });
      setAnswerInput("");
      setError("");
      setShowAnswerFeedback(false);
      setIsAnswering(true);
      setTimeLeft(30);
    });

    socket.on("gameOver", ({ players }) => {
      navigate("/results");
    });

    socket.on("answerCorrect", ({ correctAnswer }) => {
      setLastAnswer({ correct: true, answer: correctAnswer });
      setShowAnswerFeedback(true);
      setIsAnswering(false);
      setTimeout(() => {
        setCurrentQuestion(null);
        setShowAnswerFeedback(false);
        setLastAnswer(null);
      }, 3000);
    });

    socket.on("answerIncorrect", ({ correctAnswer }) => {
      setLastAnswer({ correct: false, answer: correctAnswer });
      setShowAnswerFeedback(true);
      setIsAnswering(false);
      setTimeout(() => {
        setCurrentQuestion(null);
        setShowAnswerFeedback(false);
        setLastAnswer(null);
      }, 3000);
    });

    socket.on("turnChanged", ({ currentPlayerId: newCurrentPlayerId }) => {
      setCurrentQuestion(null);
      setShowAnswerFeedback(false);
      setLastAnswer(null);
      setIsAnswering(false);
    });

    return () => {
      socket.off("questionSelected");
      socket.off("gameOver");
      socket.off("answerCorrect");
      socket.off("answerIncorrect");
      socket.off("turnChanged");
    };
  }, [socket, gameId, navigate]);

  useEffect(() => {
    if (!isAnswering) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsAnswering(false);
          setCurrentQuestion(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAnswering]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim()) return;
    submitAnswer(answerInput);
  };

  const isCurrentPlayer = currentPlayerId == socket?.id;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Game: {gameId}
          </h1>
          <div className="flex gap-4">
            {players.map((player) => (
              <div
                key={player.id}
                className={`p-4 rounded-lg ${
                  player.id === currentPlayerId
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                }`}
              >
                <p className="font-bold">{player.name}</p>
                <p>{player.points} points</p>
              </div>
            ))}
          </div>
        </div>

        {currentQuestion ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Question
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {currentQuestion.text}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Worth {currentQuestion.points} points
              </p>
            </div>

            {showAnswerFeedback && lastAnswer && (
              <div
                className={`p-4 rounded-lg mb-4 ${
                  lastAnswer.correct
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
                }`}
              >
                <p className="font-bold">
                  {lastAnswer.correct ? "Correct!" : "Incorrect!"}
                </p>
                <p>The correct answer was: {lastAnswer.answer}</p>
              </div>
            )}

            {!showAnswerFeedback && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder={
                    isCurrentPlayer
                      ? "Your answer..."
                      : "Waiting for your turn..."
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  disabled={!isCurrentPlayer}
                />
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    disabled={!isCurrentPlayer || !answerInput.trim()}
                  >
                    Submit
                  </button>
                  <p className="text-gray-500 dark:text-gray-400">
                    Time left: {timeLeft}s
                  </p>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {category.name}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {category.questions.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => selectQuestion(category.id, question.id)}
                      className={`p-2 rounded ${
                        isCurrentPlayer
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!isCurrentPlayer}
                    >
                      {question.points}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
