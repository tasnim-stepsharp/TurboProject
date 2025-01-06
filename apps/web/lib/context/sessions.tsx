"use client";
import { createSessionsStore } from "@/lib/store/sessions/store";
import { TChatMessage, TSessionsContext, TSessionsProvider } from "@/lib/types";
import { FC, createContext, useContext, useEffect, useMemo, useState } from "react";

// Define the type for a session object
type Session = {
  id: string;
  name: string;
  createdAt: string;
};

export const SessionContext = createContext<TSessionsContext | undefined>(
  undefined,
);

export const SessionsProvider: FC<TSessionsProvider> = ({ children }) => {
  const store = useMemo(() => createSessionsStore(), []);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isAllSessionLoading, setIsAllSessionLoading] = useState(false);

  store?.persist?.onFinishHydration((state) => {
    if (!state?.activeSessionId) {
      createSession();
    }
  });

  const activeSessionId = store((state) => state.activeSessionId);
  const setActiveSessionId = store((state) => state.setActiveSessionId);

  useEffect(() => {
    store.persist.rehydrate();
    fetchSessions();
  }, []);

  // Fetch sessions
  const fetchSessions = async () => {
    setIsAllSessionLoading(true);
    try {
      const response = await fetch("/api/sessions"); 
      const data: Session[] = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setIsAllSessionLoading(false);
    }
  };

  // Create a new session
  const createSession = async () => {
    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
      });
      const data: Session = await response.json();
      if (data) {
        setActiveSessionId(data.id);
        setSessions((prevSessions) => [...prevSessions, data]);
      }
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  };

  // Add a message to a session
  const addMessage = async (parentId: string, message: TChatMessage) => {
    try {
      const response = await fetch(`/api/sessions/${parentId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error("Failed to add message");
      }
    } catch (error) {
      console.error("Failed to add message:", error);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        activeSessionId,
        setActiveSessionId,
        isAllSessionLoading,
        createSession,
        refetchSessions: fetchSessions,
        addMessage,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessions = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessions must be used within a SessionsProvider");
  }
  return context;
};
