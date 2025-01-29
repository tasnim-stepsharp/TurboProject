import { FormLabel } from "../../ui";
import { Button } from "../../ui/button";
import { Flex } from "../../ui/flex";
import { Input } from "../../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { useToast } from "../../ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type OllamaSettingsProps = {
  onRefresh: () => void;
};

export const OllamaSettings = ({ onRefresh }: OllamaSettingsProps) => {
  const { push } = useRouter();
  const [url, setURL] = useState<string>("");
  const { toast } = useToast();

  // Simulate preferences (use localStorage instead of preferences context)
  useEffect(() => {
    const storedUrl = localStorage.getItem("ollamaBaseUrl");
    setURL(storedUrl || "http://localhost:11434");
  }, []);

  const updatePreferences = (url: string) => {
    localStorage.setItem("ollamaBaseUrl", url);
    setURL(url);
  };

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setURL(e.target.value);
  };

  const verifyAndSaveURL = async () => {
    try {
      const response = await fetch(url + "/api/tags");
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Ollama server endpoint is valid",
        });

        updatePreferences(url);
        onRefresh();
      } else {
        throw new Error("Response status is not 200");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Invalid Ollama server endpoint",
        variant: "destructive",
      });
      onRefresh();
    }
  };

  const tabConfigs = [
    { value: "macos", label: "Macos", message: "Macos configuration details go here." },
    { value: "windows", label: "Windows", message: "Windows configuration details go here." },
  ];

  return (
    <Flex direction="col" gap="sm">
      <FormLabel label="Ollama local server URL" />
      <Input
        placeholder="http://localhost:11434"
        value={url}
        autoComplete="off"
        onChange={handleURLChange}
      />

      <Button variant="default" onClick={verifyAndSaveURL}>
        Check Connection
      </Button>

      <Tabs defaultValue="macos" className="mt-2 w-full">
        <TabsList className="grid w-full grid-cols-2">
          {tabConfigs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabConfigs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="pb-4">
            
          </TabsContent>
        ))}
      </Tabs>
    </Flex>
  );
};