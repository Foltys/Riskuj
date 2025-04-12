import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

export default function Results() {
  const { gameId, players, startGame, socket } = useGameStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!gameId) {
      navigate("/");
    }
  }, [gameId, navigate]);
  const isHost = players[0]?.id === socket?.id;
  const handleNewGame = () => {
    if (isHost) {
      startGame();
    }
  };

  // Sort players by points in descending order
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
  const maxPoints = Math.max(...players.map((p) => p.points), 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Game Results
        </h1>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Final Scores
          </h2>
          <div className="space-y-4">
            {sortedPlayers.map((player) => (
              <div
                key={player.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {player.name}
                  </p>
                  <p className="text-lg font-bold text-blue-500">
                    {player.points} points
                  </p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{
                      width: `${(player.points / maxPoints) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Game ID: {gameId}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Share this ID with other players to join the game
          </p>
        </div>
        {isHost ? (
          <button
            onClick={handleNewGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start New Game
          </button>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            Waiting for host to start a new game...
          </p>
        )}
      </div>
    </div>
  );
}
