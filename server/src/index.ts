import { categories, Category, Question } from "./questions";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import leven from "leven";

const PORT = process.env.SERVER_PORT || "3001";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `*`,
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

interface Player {
  id: string;
  name: string;
  points: number;
}

interface Game {
  players: Player[];
  categories: Category[];
  currentQuestion: {
    categoryId: number;
    questionId: number;
  } | null;
  timer: NodeJS.Timeout | null;
  currentPlayerIndex: number;
  currentPlayerId: string | null;
}

const games = new Map<string, Game>();

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("createGame", (playerName: string) => {
    const gameId = Math.random().toString(36).substring(2, 8);
    games.set(gameId, {
      players: [{ id: socket.id, name: playerName, points: 0 }],
      categories: [],
      currentQuestion: null,
      timer: null,
      currentPlayerIndex: 0,
      currentPlayerId: socket.id,
    });
    socket.join(gameId);
    socket.emit("gameCreated", { gameId });
  });

  socket.on("joinGame", ({ gameId, playerName }) => {
    const game = games.get(gameId);
    if (!game) {
      socket.emit("error", { message: "Game not found" });
      return;
    }
    if (game.players.length >= 4) {
      socket.emit("error", { message: "Game is full" });
      return;
    }
    game.players.push({ id: socket.id, name: playerName, points: 0 });
    socket.join(gameId);
    io.to(gameId).emit("playerJoined", { players: game.players });
  });

  socket.on("startGame", async (gameId) => {
    const game = games.get(gameId);
    if (!game) {
      socket.emit("error", { message: "Game not found" });
      return;
    }

    try {
      // Fetch questions from the new API endpoint
      const response = await fetch(`http://localhost:${PORT}/api/questions`);
      const categories = await response.json();

      game.categories = categories;
      io.to(gameId).emit("gameStarted", {
        categories,
        currentPlayerId: game.players[game.currentPlayerIndex].id,
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
      socket.emit("error", { message: "Failed to start game" });
    }
  });

  socket.on("selectQuestion", ({ gameId, categoryId, questionId }) => {
    const game = games.get(gameId);
    if (!game) return;

    // Check if it's the player's turn
    if (game.players[game.currentPlayerIndex].id !== socket.id) {
      socket.emit("error", { message: "Not your turn" });
      return;
    }

    game.currentQuestion = { categoryId, questionId };
    const question = game.categories
      .find((c) => c.id === categoryId)
      ?.questions.find((q) => q.id === questionId);

    if (question) {
      io.to(gameId).emit("questionSelected", {
        text: question.text,
        points: question.points,
        playerId: socket.id,
      });

      // Start 30-second timer
      game.timer = setTimeout(() => {
        io.to(gameId).emit("timeUp", {
          correctAnswer: question.answer,
        });
        game.currentQuestion = null;
        // Move to next player
        game.currentPlayerIndex =
          (game.currentPlayerIndex + 1) % game.players.length;
        io.to(gameId).emit("turnChanged", {
          currentPlayerId: game.players[game.currentPlayerIndex].id,
          categories: game.categories,
        });
      }, 30000);
    }
  });

  socket.on("submitAnswer", ({ gameId, answer }) => {
    const game = games.get(gameId);
    if (!game || !game.currentQuestion) return;

    // Check if it's the player's turn
    if (game.players[game.currentPlayerIndex].id !== socket.id) {
      socket.emit("error", { message: "Not your turn" });
      return;
    }

    const foundCategory = game.categories.find(
      (c) => c.id === game.currentQuestion?.categoryId
    );
    const question = foundCategory?.questions.find(
      (q) => q.id === game.currentQuestion?.questionId
    );

    if (question) {
      const isCorrect =
        leven(
          answer.toLowerCase().trim(),
          question.answer.toLowerCase().trim()
        ) <= 2;

      if (isCorrect) {
        const player = game.players.find((p) => p.id === socket.id);
        if (player) {
          player.points += question.points;
          io.to(gameId).emit("answerCorrect", {
            playerId: socket.id,
            points: question.points,
            totalPoints: player.points,
            correctAnswer: question.answer,
          });
        }
      } else {
        io.to(gameId).emit("answerIncorrect", {
          correctAnswer: question.answer,
        });
      }

      // Remove the question after it's been answered
      if (foundCategory) {
        foundCategory.questions = foundCategory.questions.filter(
          (q) => q.id !== question.id
        );
      }

      if (game.timer) {
        clearTimeout(game.timer);
        game.timer = null;
      }
      game.currentQuestion = null;

      // Check if all questions have been answered
      const allQuestionsAnswered = game.categories.every(
        (category) => category.questions.length === 0
      );

      if (allQuestionsAnswered) {
        // Game is over, navigate to results
        io.to(gameId).emit("gameOver", {
          players: game.players,
        });
      } else {
        // Wait 3 seconds before moving to next player
        setTimeout(() => {
          // Move to next player
          game.currentPlayerIndex =
            (game.currentPlayerIndex + 1) % game.players.length;
          io.to(gameId).emit("turnChanged", {
            currentPlayerId: game.players[game.currentPlayerIndex].id,
            categories: game.categories,
          });
        }, 3000);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// New API endpoint to get random categories and questions
app.get("/api/questions", (req, res) => {
  // Shuffle the categories array
  const shuffledCategories = [...categories].sort(() => Math.random() - 0.5);

  // Take first 12 categories
  const selectedCategories = shuffledCategories.slice(0, 12);

  // For each category, ensure it has exactly 6 questions
  const categoriesWithQuestions = selectedCategories.map((category) => ({
    ...category,
    questions: category.questions.slice(0, 6), // Each category already has 6 questions
  }));

  res.json(categoriesWithQuestions);
});

httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
