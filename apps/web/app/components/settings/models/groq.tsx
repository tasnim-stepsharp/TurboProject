import { FormLabel } from "../../../components/ui";
import { Button } from "../../../components/ui/button";
import { Flex } from "../../../components/ui/flex";
import { useEffect, useState } from "react";
import { ApiKeyInfo } from "./api-key-info";
import ApiKeyInput from "./api-key-input";

export const GroqSettings = () => {
  const [key, setKey] = useState<string>("");
  const [groqKey, setGroqKey] = useState<string | null>(null);
  const [isCheckingApiKey, setIsCheckingApiKey] = useState<boolean>(false);

  // Simulate API key retrieval
  useEffect(() => {
    const storedKey = localStorage.getItem("groqKey");
    setGroqKey(storedKey);
    setKey(storedKey || "");
  }, []);

  // Simulate API key update
  const updateApiKey = (key: string) => {
    if (key) {
      localStorage.setItem("groqKey", key);
    } else {
      localStorage.removeItem("groqKey");
    }
    setGroqKey(key || null);
  };

  // Simulate API key validation
  const checkApiKey = (key: string, onValidated: () => void, onError: () => void) => {
    setIsCheckingApiKey(true);

    // Fake validation logic
    setTimeout(() => {
      setIsCheckingApiKey(false);
      if (key.startsWith("sk-")) {
        onValidated();
      } else {
        onError();
      }
    }, 1000);
  };

  return (
    <Flex direction="col" gap="md">
      <FormLabel
        label="Groq API Key"
        link="https://console.groq.com/" // Replace configs dependency with direct link
        linkText="Get API key here"
      />

      <ApiKeyInput
        value={key}
        setValue={setKey}
        isDisabled={!!groqKey}
        placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
        isLocked={!!groqKey}
      />

      <Flex gap="sm">
        {!groqKey && (
          <Button
            variant="default"
            onClick={() => {
              checkApiKey(key, () => {
                updateApiKey(key);
              }, () => {
                setKey("");
              });
            }}
          >
            {isCheckingApiKey ? "Checking..." : "Save Key"}
          </Button>
        )}

        {groqKey && (
          <Button
            variant="secondary"
            onClick={() => {
              setKey("");
              updateApiKey("");
            }}
          >
            Remove Key
          </Button>
        )}
      </Flex>
      <ApiKeyInfo />
    </Flex>
  );
};
