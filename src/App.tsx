import React, { useEffect, useState } from "react";
import TagInput from "./components/TagInput";
import ChatArea from "./components/ChatArea";
import {
  SelectedTagsProvider,
  useSelectedTagsContext,
} from "./context/SelectedTagsContext";
import SignalRSetupComponent from "./services/singlarSetup";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loading-screen">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="flex justify-center h-screen p-4 space-x-8">
          <SelectedTagsProvider>
            <SignalRSetupComponent />
            <div className="w-1/4">
              <TagInput />
            </div>
            <div className="w-3/4">
              <ChatArea />
            </div>
          </SelectedTagsProvider>
        </div>
      )}
    </div>
  );
};
export default App;
