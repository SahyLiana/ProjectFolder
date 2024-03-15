import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import "react-chatbot-kit/build/main.css";
function ChatBot() {
  return (
    <div style={{ maxWidth: "300px", backgroundColor: "white" }}>
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        // style={{ backgroundColor: "white" }}
      />
    </div>
  );
}

export default ChatBot;
