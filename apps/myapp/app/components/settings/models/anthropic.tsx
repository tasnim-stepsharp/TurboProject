import { FormLabel } from "../../ui";
import { Button } from "../../ui/button";
import { Flex } from "../../ui/flex";
import { useEffect, useState } from "react";
import { ApiKeyInfo } from "./api-key-info";
import ApiKeyInput from "./api-key-input";

export const AnthropicSettings = () => {
  const [key, setKey] = useState<string>("");
  const [anthropicKey, setAnthropicKey] = useState<string | null>(null);
  const [isCheckingApiKey, setIsCheckingApiKey] = useState<boolean>(false);

  // Simulating the getApiKey functionality
  useEffect(() => {
    const storedKey = localStorage.getItem("anthropicKey");
    setAnthropicKey(storedKey);
    setKey(storedKey || "");
  }, []);

  // Simulating the updateApiKey functionality
  const updateApiKey = (key: string) => {
    if (key) {
      localStorage.setItem("anthropicKey", key);
    } else {
      localStorage.removeItem("anthropicKey");
    }
    setAnthropicKey(key || null);
  };

  // Simulating checkApiKey functionality
  const checkApiKey = (key: string, onValidated: () => void, onError: () => void) => {
    setIsCheckingApiKey(true);

    // Simulate API key validation (replace this with actual API logic)
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
        label="Anthropic API Key"
        link="https://console.anthropic.com/" // Direct link instead of configs dependency
        linkText="Get API key here"
      />

      <ApiKeyInput
        value={key}
        setValue={setKey}
        isDisabled={!!anthropicKey}
        placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
        isLocked={!!anthropicKey}
      />

      <Flex gap="sm">
        {!anthropicKey && (
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

        {anthropicKey && (
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
