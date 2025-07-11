import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface Player {
  id: string;
  name: string;
  points: number;
}

interface Question {
  id: number;
  text: string;
  answer: string;
  points: number;
}

interface Category {
  id: number;
  name: string;
  questions: Question[];
}

interface GameState {
  socket: Socket | null;
  gameId: string | null;
  playerName: string;
  players: Player[];
  categories: Category[];
  currentQuestion: {
    text: string;
    points: number;
    playerId: string;
  } | null;
  currentPlayerId: string | null;
  isDarkMode: boolean;
  lastAnswer: {
    correct: boolean;
    answer: string;
  } | null;
  setDarkMode: (isDark: boolean) => void;
  connectSocket: () => void;
  createGame: (playerName: string) => void;
  joinGame: (gameId: string, playerName: string) => void;
  startGame: () => void;
  selectQuestion: (categoryId: number, questionId: number) => void;
  submitAnswer: (answer: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  socket: null,
  gameId: null,
  playerName: "",
  players: [],
  categories: [],
  currentQuestion: null,
  currentPlayerId: null,
  isDarkMode: false,
  lastAnswer: null,

  setDarkMode: (isDark) => {
    set({ isDarkMode: isDark });
    document.documentElement.classList.toggle("dark", isDark);
  },

  connectSocket: () => {
    const { socket } = get();
    if (socket) return; // If socket is already connected, don't create a new one

    const newSocket = io(`http://localhost:3005`);
    newSocket.connect();
    set({ socket: newSocket });

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("gameCreated", ({ gameId }) => {
      set({ gameId });
    });

    newSocket.on("playerJoined", ({ players }) => {
      set({ players });
    });

    newSocket.on(
      "gameStarted",
      ({ categories, currentPlayerId: serverCurrentPlayerId }) => {
        set((state) => ({
          ...state,
          categories,
          currentPlayerId: serverCurrentPlayerId,
        }));
      }
    );

    newSocket.on("questionSelected", (question) => {
      set({ currentQuestion: question, lastAnswer: null });
    });

    newSocket.on(
      "answerCorrect",
      ({ playerId, points, totalPoints, correctAnswer }) => {
        set((state) => ({
          players: state.players.map((player) =>
            player.id === playerId ? { ...player, points: totalPoints } : player
          ),
          lastAnswer: { correct: true, answer: correctAnswer },
        }));
      }
    );

    newSocket.on("answerIncorrect", ({ correctAnswer }) => {
      set({ lastAnswer: { correct: false, answer: correctAnswer } });
    });

    newSocket.on("timeUp", ({ correctAnswer }) => {
      set({ lastAnswer: { correct: false, answer: correctAnswer } });
    });

    newSocket.on(
      "turnChanged",
      ({ currentPlayerId: newCurrentPlayerId, categories: newCategories }) => {
        set((state) => ({
          ...state,
          currentPlayerId: newCurrentPlayerId,
          categories: newCategories,
        }));
      }
    );

    newSocket.on("error", ({ message }) => {
      console.error("Game error:", message);
    });
  },

  createGame: (playerName) => {
    const { socket } = get();
    if (!socket) {
      console.error("Socket not connected");
      return;
    }
    set({ playerName });
    socket.emit("createGame", playerName);
  },

  joinGame: (gameId, playerName) => {
    const { socket } = get();
    if (socket) {
      set({ gameId, playerName });
      socket.emit("joinGame", { gameId, playerName });
    }
  },

  startGame: () => {
    const { socket, gameId } = get();
    if (socket && gameId) {
      socket.emit("startGame", gameId);
    }
  },

  selectQuestion: (categoryId, questionId) => {
    const { socket, gameId } = get();
    if (socket && gameId) {
      socket.emit("selectQuestion", { gameId, categoryId, questionId });
    }
  },

  submitAnswer: (answer) => {
    const { socket, gameId } = get();
    if (socket && gameId) {
      socket.emit("submitAnswer", { gameId, answer });
    }
  },
}));
