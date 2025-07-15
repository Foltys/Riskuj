import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

export default function WaitingRoom() {
  const navigate = useNavigate();
  const { socket, gameId, playerName, players, startGame } = useGameStore();

  useEffect(() => {
    if (!gameId) {
      navigate("/");
      return;
    }

    if (!socket) return;

    const handleGameStarted = () => {
      navigate("/game");
    };

    socket.on("gameStarted", handleGameStarted);

    return () => {
      socket.off("gameStarted", handleGameStarted);
    };
  }, [socket, gameId, navigate]);

  const handleStartGame = () => {
    if (socket && gameId) {
      startGame();
    }
  };

  const isHost = players[0]?.id === socket?.id;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Waiting Room
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Game ID: {gameId}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Your name: {playerName}
          </p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Players ({players.length}/4):
            </h3>
            <ul className="space-y-2">
              {players.map((player) => (
                <li
                  key={player.id}
                  className="text-gray-700 dark:text-gray-300"
                >
                  {player.name} {player.id === players[0].id ? "(Host)" : ""}
                </li>
              ))}
            </ul>
          </div>
          {isHost && (
            <button
              onClick={handleStartGame}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={players.length < 2}
            >
              Start Game
            </button>
          )}
          {!isHost && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Waiting for host to start the game...
            </p>
          )}
          <button
            className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              const url = new URL(window.location.origin);
              url.searchParams.set("gameId", gameId || "");
              navigator.clipboard.writeText(url.toString());
              (e.target as HTMLButtonElement).textContent = "Link zkopírován";
              (e.target as HTMLButtonElement).className =
                "w-full mt-4 px-4 py-2 bg-green-300 text-white disabled rounded";
              setTimeout(() => {
                (e.target as HTMLButtonElement).textContent = "Pozvat kamaráda";
                (e.target as HTMLButtonElement).className =
                  "w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600";
              }, 3000);
            }}
          >
            Pozvat kamaráda
          </button>
        </div>
      </div>
    </div>
  );
}
