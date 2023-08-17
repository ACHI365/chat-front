import React, { createContext, useContext, useState } from "react";

interface SelectedTagsContextProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  messages: { content: string; selectedTags: string[] }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ content: string; selectedTags: string[] }[]>
  >;
  messageRecieved: number;
  setMessageRecieved: React.Dispatch<React.SetStateAction<number>>;
}

const SelectedTagsContext = createContext<SelectedTagsContextProps | undefined>(
  undefined
);

export const useSelectedTagsContext = () => {
  const context = useContext(SelectedTagsContext);
  if (!context) {
    throw new Error(
      "useSelectedTagsContext must be used within a SelectedTagsProvider"
    );
  }
  return context;
};

export function SelectedTagsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [messages, setMessages] = useState<
    { content: string; selectedTags: string[] }[]
  >([]);
  const [messageRecieved, setMessageRecieved] = useState<number>(0);

  return (
    <SelectedTagsContext.Provider
      value={{
        selectedTags,
        setSelectedTags,
        messages,
        setMessages,
        messageRecieved,
        setMessageRecieved,
      }}
    >
      {children}
    </SelectedTagsContext.Provider>
  );
}
