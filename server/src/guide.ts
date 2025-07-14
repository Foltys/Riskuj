import { readFileSync } from "fs";
import { join } from "path";

export function getQuestionGenerationGuide(): string {
  try {
    // In development, read from the server directory
    if (process.env.NODE_ENV !== "production") {
      return readFileSync(
        join(__dirname, ".", "question_generation_guide.md"),
        "utf8"
      );
    }

    // In production (built with ncc), read from the dist directory
    return readFileSync(
      join(__dirname, "question_generation_guide.md"),
      "utf8"
    );
  } catch (error) {
    console.error("Error reading question generation guide:", error);
    return "Question generation guide not found.";
  }
}

export const GUIDE_CONTENT = getQuestionGenerationGuide();
