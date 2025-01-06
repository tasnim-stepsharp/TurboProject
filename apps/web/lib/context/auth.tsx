"use client";
import { Button, Flex, Type } from "../../app/components/ui";
import { createContext, useContext, useState } from "react";
import { Drawer } from "vaul";

export type TAuthContext = {
  user?: { email: string };
  open: () => void;
  logout: () => void;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export type TAuthProvider = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: TAuthProvider) => {
  const [user, setUser] = useState<{ email: string }>();
  const [openSignIn, setOpenSignIn] = useState(false);

  const open = () => {
    setOpenSignIn(true);
  };

  const logout = () => {
    setUser(undefined);
  };

  const signInWithGoogle = () => {
    setUser({ email: "user.google@example.com" });
    setOpenSignIn(false);
  };

  const signInWithGithub = () => {
    setUser({ email: "user.github@example.com" });
    setOpenSignIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, open, logout }}>
      {children}
      <Drawer.Root
        direction="bottom"
        shouldScaleBackground
        modal
        open={openSignIn}
        onOpenChange={setOpenSignIn}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[400] bg-zinc-500/50 dark:bg-zinc-900/50" />
          <Drawer.Content
            className="fixed bottom-0 left-0 right-0 z-[500] mx-auto mt-24 flex max-h-[530px] flex-col items-center outline-none md:bottom-8 md:left-[50%] w-full md:ml-[-190px] md:w-[380px]"
          >
            <div className="relative w-full space-y-4 rounded-2xl bg-white dark:border dark:border-white/10 dark:bg-zinc-800">
              <Flex
                className="w-full p-6"
                items="center"
                direction="col"
                gap="lg"
              >
                <Flex gap="xs" direction="col">
                  <Type weight="bold" size="lg">
                    Join our community!
                  </Type>
                  <Type size="sm" textColor="secondary">
                    Sign up to unlock your daily free usage limit and receive
                    updates on new features.
                  </Type>
                </Flex>
                <Flex gap="sm" direction="col" className="w-full">
                  <Button
                    className="plausible-event-name=Signup w-full"
                    rounded="full"
                    variant="secondary"
                    size="md"
                    onClick={signInWithGoogle}
                  >
                    Sign In with Google
                  </Button>
                  <Button
                    className="plausible-event-name=Signup w-full"
                    rounded="full"
                    size="md"
                    onClick={signInWithGithub}
                  >
                    Sign In with Github
                  </Button>
                </Flex>
                <Type size="xs" textColor="tertiary">
                  Login is required to ensure fair usage however, your chat
                  sessions and API keys will be stored locally in your browser.
                </Type>
              </Flex>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </AuthContext.Provider>
  );
};
