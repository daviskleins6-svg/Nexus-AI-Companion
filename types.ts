
export interface LuauModule {
  title: string;
  filename: string;
  code: string;
  type: 'server' | 'client' | 'shared' | 'config';
  description: string;
}

export interface GenerationResult {
  systemName: string;
  plan: string;
  whatChanged: string; // Surgical UI: Plain English diff
  architectureNotes: string;
  modules: LuauModule[];
  preFlightCheck: string[];
  guardianAlert?: string; // Guardian Mode: Dangerous action detection
  clarifyingQuestions?: string[]; // Vague prompt handling
  quickStart?: string[]; // Onboarding
  educationalDeepDive: string; // ELI5 + Technical
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
