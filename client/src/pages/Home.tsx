import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

export default function Home() {
  const navigate = useNavigate();
  const { createGame, joinGame, connectSocket, gameId } = useGameStore();
  const [playerName, setPlayerName] = useState("");
  const [gameIdInput, setGameIdInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  useEffect(() => {
    console.log("gameId", gameId);
    if (gameId) {
      navigate("/waiting");
    }
  }, [gameId, navigate]);

  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError("Please enter your name");
      return;
    }
    createGame(playerName);
  };

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || !gameIdInput.trim()) {
      setError("Please enter both your name and game ID");
      return;
    }
    joinGame(gameIdInput, playerName);
    navigate("/waiting");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Riskuj2
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <form onSubmit={handleCreateGame} className="space-y-4">
            <div>
              <label
                htmlFor="playerName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Name
              </label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your name"
              />
            </div>
            {error && (
              <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
            )}
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create New Game
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or join existing game
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="gameId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Game ID
                </label>
                <input
                  type="text"
                  id="gameId"
                  value={gameIdInput}
                  onChange={(e) => setGameIdInput(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter game ID"
                />
              </div>
              <button
                type="button"
                onClick={handleJoinGame}
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Join Game
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
