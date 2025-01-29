import { TAssistant } from "./assistants";
import { TProvider } from "./models";

export type TApiKeys = { id: string; key: string; provider: TProvider }[];
export type TApiKeyInsert = { key: string; provider: TProvider };

export type TLegacyApiKeys = Partial<Record<TProvider, string>>;

export type TPreferencesState = {
  preferences: TPreferences;
  setPreferences: (preferences: Partial<TPreferences>) => void;
  apiKeys: TApiKeys[];
  setApiKeys: (apiKeys: TApiKeys[]) => void;
};

export type TPreferences = {
  id: string;
  userId: string;
  systemPrompt: string;
  messageLimit: number;
  maxTokens: number;
  temperature: number;
  topP: number;
  topK: number;
  suggestRelatedQuestions: boolean;
  generateTitle: boolean;
};

export type TLegacyPreferences = {
  defaultAssistant: TAssistant["key"];
  systemPrompt: string;
  messageLimit: number;
  temperature: number;
  memories: string[];
  suggestRelatedQuestions: boolean;
  generateTitle: boolean;
  defaultPlugins: string[];
  whisperSpeechToTextEnabled: boolean;
  dalleImageQuality: "standard" | "hd";
  dalleImageSize: "1024x1024" | "1792x1024" | "1024x1792";
  maxTokens: number;
  defaultWebSearchEngine: "google" | "duckduckgo";
  ollamaBaseUrl: string;
  topP: number;
  topK: number;
  googleSearchEngineId?: string;
  googleSearchApiKey?: string;
};
