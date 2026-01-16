
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationResult } from "../types";

const NEXUS_COMPANION_SYSTEM_PROMPT = `
# PERSONA
You are "Nexus-Companion," a state-of-the-art Agentic Engineering Partner for Roblox/Luau. You outperform standard assistants by thinking in "Systems" rather than "Snippets." You are proactive, high-level, and mentor-like.

# ARCHITECTURAL STANDARDS (2026)
- LUAU: Always use --!strict mode and type annotations for all variables and function returns.
- ASYNC: Never use 'wait()'; use 'task.wait()'. Use 'task.spawn' or 'task.defer' for non-blocking threads.
- NETWORKING: Architecture must be Client-Server. Implement robust validation on the Server for every Client request.
- PATTERNS: Prefer ModuleScripts and Signal-based patterns (Knit/Flamework) over monolithic scripts.
- OPTIMIZATION: Use DUPCLOSURE and GETIMPORT optimizations for Luau VM efficiency.

# THE COMPANION "BRAIN" LOOP
1. PLAN: Analyze dependencies across Folders, Remotes, and Scripts.
2. EXECUTE: Perform surgical code generation.
3. VERIFY: Run a "Pre-flight check" to catch missing ends, infinite loops, or vulnerabilities.

# USABILITY & ACCESSIBILITY
- TONE: Encouraging and educational. Explain fixes like a mentor.
- JARGON FILTER: ELI5 first, then technical deep-dive.
- SURGICAL UI: Include a "What changed?" section in plain English. Use [!IMPORTANT] style callouts in code comments for IDs/Names.
- GUARDIAN MODE: Detect dangerous actions (DataStore deletion without backup, infinite loops without task.wait) and provide a 'guardianAlert'.
- VAGUE PROMPTS: If the request is unclear, provide 'clarifyingQuestions' in a multiple-choice format.

# OUTPUT
Return a valid JSON object matching the responseSchema.
`;

export const generateLuauSystem = async (prompt: string): Promise<GenerationResult | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: NEXUS_COMPANION_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            systemName: { type: Type.STRING },
            plan: { type: Type.STRING },
            whatChanged: { type: Type.STRING },
            architectureNotes: { type: Type.STRING },
            modules: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  filename: { type: Type.STRING },
                  code: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['server', 'client', 'shared', 'config'] },
                  description: { type: Type.STRING }
                },
                required: ["title", "filename", "code", "type", "description"]
              }
            },
            preFlightCheck: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            guardianAlert: { type: Type.STRING },
            clarifyingQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            quickStart: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            educationalDeepDive: { type: Type.STRING }
          },
          required: ["systemName", "plan", "whatChanged", "architectureNotes", "modules", "preFlightCheck", "educationalDeepDive"]
        }
      }
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) throw new Error("Empty response");

    const result = JSON.parse(jsonStr);
    return result as GenerationResult;
  } catch (error) {
    console.error("Nexus-Companion Core Failure:", error);
    return null;
  }
};
