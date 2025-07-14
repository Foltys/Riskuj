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

export class GeminiAPI {
  private apiKey: string;
  private baseUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateQuestions(categoryCount: number): Promise<string> {
    const guide = getQuestionGenerationGuide();

    const prompt = this.buildPrompt(guide, categoryCount);

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

      const result = data.candidates[0].content.parts[0].text;

      // Strip markdown formatting and clean up the response
      const cleanedResult = this.cleanJsonResponse(result);

      return cleanedResult;
    } catch (error) {
      console.error("Error generating questions:", error);
      throw error;
    }
  }

  private cleanJsonResponse(response: string): string {
    // Remove markdown code block formatting
    let cleaned = response.replace(/```json\n?/g, "");
    cleaned = cleaned.replace(/```\n?/g, "");

    // Remove leading/trailing whitespace
    cleaned = cleaned.trim();

    // Additional cleanup for any remaining formatting artifacts
    cleaned = cleaned.replace(/^\n+|\n+$/g, "");

    return cleaned;
  }

  private buildPrompt(guide: string, categoryCount: number): string {
    return `
You are a Czech trivia question generator. Please read the following guide carefully and follow all instructions exactly:

${guide}

Requirements:
1. Return ONLY valid JSON that defines an array of Question objects
2. Follow the exact schema provided in the guide
3. Ensure all questions are specific and unambiguous
4. Use appropriate leven values (0 for exact, 1 for allowing typos)
5. Include last names for person names in the answers array
6. Verify all facts are accurate
7. Questions should be in Czech language
8. Each question has different point value based on difficulty, this value increases by 100 points for each difficulty level starting from 100 points up to 600 points

CRITICAL: Return ONLY raw JSON without any markdown formatting or code blocks. DO NOT use backticks or code block markers. Return the response exactly as a JSON string:
[{"id":1,"name":"Technologie","questions":[{"id":1,"text":"Která česká firma je známá výrobou her DayZ a Arma?","answers":["Bohemia Interactive"],"leven":1,"points":500}]}]

Generate ${categoryCount} categories with questions now:
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
