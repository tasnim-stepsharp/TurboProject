"use client";
import { SettingCard } from "../../components/settings/setting-card";
import { SettingsContainer } from "../../components/settings/settings-container";
import {
  Button,
  Flex,
  Input,
  PopOverConfirmProvider,
  Type,
  useToast,
} from "../../components/ui";

export default function DataSettings() {
  const { toast } = useToast();
  return (
    <Flex direction="col" gap="xl" className="w-full">
      <SettingsContainer title="Manage your Data">
        <Flex direction="col" gap="md" className="w-full">
          <SettingCard className="py-5">
            <Flex items="center" justify="between">
              <Type textColor="primary" weight="medium">
                Clear Chat History
              </Type>
            </Flex>
            <div className="my-4 h-[1px] w-full bg-zinc-500/10" />
            <Flex items="center" justify="between">
              <Type textColor="primary" weight="medium">
                Reset Preferences
              </Type>
            </Flex>
          </SettingCard>
        </Flex>
      </SettingsContainer>
    </Flex>
  );
}
