import React, { useState, useEffect, useRef } from "react";
import { useSelectedTagsContext } from "../context/SelectedTagsContext";
import { api, sendMessage, fetchMessages } from "../services/api";

const ChatArea: React.FC = () => {
  const { messages, setMessages, messageRecieved } = useSelectedTagsContext();
  const [newMessage, setNewMessage] = useState<string>("");
  const { selectedTags } = useSelectedTagsContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const sendMessageToBackend = async () => {
    if (newMessage.trim() !== "") {
      try {
        await sendMessage(newMessage, selectedTags);        
        setMessages([...messages, { content: newMessage, selectedTags }]);
        setNewMessage("");
        scrollToBottom();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const fetchMessagesFromBackend = async () => {
    setIsLoading(true);
    try {
      const fetchedMessages = await fetchMessages(selectedTags);
      setMessages([...fetchedMessages]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessagesFromBackend();
  }, [messageRecieved]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-hidden">
        <div
          className="custom-scrollbar border rounded p-2 h-full overflow-y-auto"
          ref={chatContainerRef} /* Attach ref to the chat container */
        >
          {messages.map((message, index) => (
            <div key={index} className="flex mb-2">
              <div className="bg-blue-500 text-white rounded-lg p-2 max-w-3/4">
                {message.selectedTags.length > 0 && (
                  <div className="flex mt-1">
                    {message.selectedTags.map((tag, tagIndex) => (
                      <div
                        key={tagIndex}
                        className="bg-blue-400 text-white rounded-full px-2 py-1 ml-1 text-xs"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessageToBackend();
            }
          }}
          placeholder="Type your message..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={sendMessageToBackend}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full transition-colors hover:bg-blue-600 transition duration-500 ease-in-out"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
