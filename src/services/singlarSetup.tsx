  import React, { useEffect } from "react";
  import { useSelectedTagsContext } from "../context/SelectedTagsContext";
  import { HubConnectionBuilder } from "@microsoft/signalr";
  import { fetchMessages } from "./api";

  const SignalRSetupComponent = () => {
    const { selectedTags, setMessages, messages, setMessageRecieved } = useSelectedTagsContext();

    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_BACK_URL}/chatHub`)
      .build();

    useEffect(() => {
      console.log("Hub connection starting...");
      hubConnection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub.");
        })
        .catch((error) => {
          console.error("Error connecting to SignalR hub:", error);
        });
    }, []);

    useEffect(() => {
      hubConnection.on("ReceiveMessage", (message, tags) => {
        setMessageRecieved(new Date().getTime() - Math.random())
      });
    }, [selectedTags, setMessages, hubConnection]);

    return null;
  };

  export default SignalRSetupComponent;
