import { getQuestionGenerationGuide } from "./guide";

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface QuestionGenerationRequest {
  category: string;
  count: number;
  difficulty?: "easy" | "medium" | "hard";
  topics?: string[];
}

export class GeminiAPI {
  private apiKey: string;
  private baseUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateQuestions(request: QuestionGenerationRequest): Promise<string> {
    const guide = getQuestionGenerationGuide();

    const prompt = this.buildPrompt(request, guide);

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Gemini API error: ${response.status} ${response.statusText}`
        );
      }

      const data: GeminiResponse = await response.json();

      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content
      ) {
        throw new Error("Invalid response from Gemini API");
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error generating questions:", error);
      throw error;
    }
  }

  private buildPrompt(
    request: QuestionGenerationRequest,
    guide: string
  ): string {
    const { category, count, difficulty = "medium", topics = [] } = request;

    const difficultyInstructions = {
      easy: "Focus on basic, well-known facts that most people would know.",
      medium:
        "Include moderately challenging questions that require some knowledge.",
      hard: "Create challenging questions that require deep knowledge of the subject.",
    };

    const topicsText =
      topics.length > 0
        ? `Focus specifically on these topics: ${topics.join(", ")}.`
        : "";

    return `
You are a Czech trivia question generator. Please read the following guide carefully and follow all instructions exactly:

${guide}

Now generate ${count} questions for the category "${category}" with ${difficulty} difficulty level.

${topicsText}

${difficultyInstructions[difficulty]}

Requirements:
1. Return ONLY valid TypeScript code that defines an array of Question objects
2. Follow the exact schema provided in the guide
3. Ensure all questions are specific and unambiguous
4. Use appropriate leven values (0 for exact, 1 for allowing typos)
5. Include last names for person names in the answers array
6. Verify all facts are accurate
7. Questions should be in Czech language
8. Point values should be between 100-600

Format your response like this:
\`\`\`typescript
const questions: Question[] = [
  {
    id: 1,
    text: "Your question here?",
    answers: ["Answer", "Alternative"],
    leven: 1,
    points: 100,
  },
  // ... more questions
];
\`\`\`

Generate exactly ${count} questions now:
`;
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Test connection. Reply with "OK".',
                },
              ],
            },
          ],
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Gemini API connection test failed:", error);
      return false;
    }
  }
}
console.log(process.env.GEMINI_API_KEY);
// Export a singleton instance
export const geminiAPI = (key: string) => {
  console.log(key);
  return new GeminiAPI(key);
};
