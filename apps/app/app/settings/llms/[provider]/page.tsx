"use client";
import { ModelIcon, ModelIconType } from "../../../components/model-icon";
import { AnthropicSettings } from "../../../components/settings/models/anthropic";
import { GroqSettings } from "../../../components/settings/models/groq";
import { OllamaSettings } from "../../../components/settings/models/ollama";
import { SettingsContainer } from "../../../components/settings/settings-container";
import { providers } from "@/config/models";
import { cn } from "@/lib/utils/clsx";
import { TProvider } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Flex,
} from "../../../components/ui";
import { BadgeCheckIcon, CircleAlert } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LLMsSettings() {
  const { provider } = useParams();
  const { push } = useRouter();

  const [selectedModel, setSelectedModel] = useState<TProvider>("openai");
  const [ollamaConnected, setOllamaConnected] = useState(false);

  // Mock data for preferences and API keys
  const [preferences, setPreferences] = useState({
    ollamaBaseUrl: "https://example-ollama.com",
  });

  const mockApiKeys = {
    openai: "mock-openai-key",
    anthropic: "mock-anthropic-key",
    gemini: "mock-gemini-key",
    groq: "mock-groq-key",
  };

  const getApiKey = (key: string) => mockApiKeys[key as keyof typeof mockApiKeys];

  const checkOllamaConnection = async () => {
    try {
      const url = preferences.ollamaBaseUrl;
      await fetch(url + "/api/tags");
      setOllamaConnected(true);
    } catch (error) {
      setOllamaConnected(false);
    }
  };

  useEffect(() => {
    checkOllamaConnection();
  }, [preferences.ollamaBaseUrl]);

  useEffect(() => {
    if (providers.includes(provider as TProvider)) {
      setSelectedModel(provider as TProvider);
    } else {
      push("settings/llms/openai");
    }
  }, [provider]);

  const modelSettingsData = [
    {
      value: "anthropic",
      label: "Anthropic",
      iconType: "anthropic",
      connected: !!getApiKey("anthropic"),
      settingsComponent: AnthropicSettings,
    },
    {
      value: "ollama",
      label: "Ollama",
      iconType: "ollama",
      connected: ollamaConnected,
      settingsComponent: () => (
        <OllamaSettings
          onRefresh={() => {
            checkOllamaConnection();
          }}
        />
      ),
    },
    {
      value: "groq",
      label: "Groq",
      iconType: "groq",
      connected: !!getApiKey("groq"),
      settingsComponent: GroqSettings,
    },
  ];

  return (
    <SettingsContainer title="Providers">
      <Accordion
        type="single"
        value={selectedModel}
        collapsible
        className="w-full"
        onValueChange={(value) => {
          setSelectedModel(value as TProvider);
        }}
      >
        {modelSettingsData.map((model) => (
          <AccordionItem key={model.value} value={model.value}>
            <AccordionTrigger>
              <Flex gap="md" items="center">
                <ModelIcon type={model.iconType as ModelIconType} size="md" />
                {model.label}
              </Flex>
              <Flex className="flex-1" />
              <div
                className={cn(
                  "!rotate-0 px-2",
                  model.connected
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-zinc-500"
                )}
              >
                {model.connected ? (
                  <BadgeCheckIcon size={18} strokeWidth={2} />
                ) : (
                  <CircleAlert size={18} strokeWidth={2} />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="py-8">
              <model.settingsComponent />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SettingsContainer>
  );
}
