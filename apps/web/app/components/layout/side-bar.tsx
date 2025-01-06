// import { configs } from "@/config/index";
import { useAuth } from "@/lib/context";
import { useRootContext } from "@/libs/context/root";
import { Button, Flex, Tooltip, Type } from "../ui";
import Avvvatars from "avvvatars-react";
import {
  LogInIcon,
  LogOut,
  Moon,
  Sun,
  KeyRound,
  Bolt,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { BsGithub, BsTwitter } from "react-icons/bs";

export const Sidebar = () => {
  const { open: openSignIn, logout, user } = useAuth();
  const { push } = useRouter();
  const { setOpenApiKeyModal } = useRootContext();
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative flex h-[100dvh] w-[260px] flex-shrink-0 flex-row border-l border-zinc-500/10">
      <Flex direction="col" gap="xl" className="no-scrollbar w-full pl-3 pr-1">
        {/* Sidebar Content */}
        <Flex className="w-full bg-zinc-50 py-3 dark:bg-zinc-900" direction="col" gap="sm">
          {/* Sign In / Sign Out */}
          {!user ? (
            <Button
              size="sm"
              variant="secondary"
              className="w-full gap-2"
              onClick={() => openSignIn()}
            >
              <LogInIcon size={16} strokeWidth={2} />
              Sign In
            </Button>
          ) : (
            <Flex
              gap="sm"
              items="center"
              className="w-full rounded-lg border border-zinc-500/20 bg-white p-1 dark:bg-zinc-800"
            >
              <Avvvatars value={user.email || "Anonymous"} size={24} />
              <Type size="xs" className="line-clamp-1 flex-grow">
                {user.email}
              </Type>
              <Tooltip content="Sign Out">
                <Button size="icon-xs" variant="ghost" onClick={() => logout()}>
                  <LogOut size={14} strokeWidth={2} />
                </Button>
              </Tooltip>
            </Flex>
          )}

          {/* Add API & Settings */}
          <Flex gap="sm" className="w-full">
            <Button
              variant="bordered"
              size="sm"
              className="w-full gap-2"
              onClick={() => {
                setOpenApiKeyModal(true);
              }}
            >
              <KeyRound size={16} strokeWidth={2} />
              Add API
            </Button>
            <Button
              variant="bordered"
              size="sm"
              className="w-full gap-2"
              onClick={() => {
                push("/settings");
              }}
            >
              <Bolt size={16} strokeWidth={2} />
              Settings
            </Button>
          </Flex>

          {/* Theme Toggle & Socials */}
          <Flex className="w-full items-center justify-between opacity-70">
            <Flex gap="xs">
              <Button
                size="icon-xs"
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
              </Button>
              <Button
                size="icon-xs"
                variant="ghost"
                onClick={() => {
                  window.open("https://git.new/llmchat", "_blank");
                }}
              >
                <BsGithub size={14} />
              </Button>
              <Button
                size="icon-xs"
                variant="ghost"
                onClick={() => {
                  window.open("https://x.com/llmchatOS", "_blank");
                }}
              >
                <BsTwitter size={14} />
              </Button>
            </Flex>
            <Type
              size="xs"
              weight="medium"
              textColor="secondary"
              className="px-1"
            >
              {/* v {configs.version} */}
            </Type>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};
