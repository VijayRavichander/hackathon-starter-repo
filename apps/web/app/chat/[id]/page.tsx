"use client";

import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { ShowReasoning, ShowWeatherTool } from "./utils";

export default function Home() {
  const [input, setInput] = useState("");

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen mx-auto w-full bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <div className="w-full p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg bg-transparent text-white outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 border rounded-lg hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
        <div className="text-sm text-gray-500 mt-4 text-center">
          <p>
            This is a demo of the AI SDK. It is using the OpenRouter API to
            generate responses.
          </p>
        </div>
      </div>
    </div>
  );
}


export function Message({ message }: { message: UIMessage }) {
    return (
      <div
        className={`flex gap-5 p-4 ${
          message.role === "assistant" ? "rounded-lg" : ""
        }`}
      >
        <div className="text-sm">
          {message.role === "user" ? "U" : "A"}
        </div>
        <div className="text-sm">
          {" "}
          {message.parts.map((part, index) => {
            if (part.type === "text") {
              return part.text;
            }

            if(part.type === 'reasoning') {
                return <ShowReasoning key={index} reasoning={part.text} />;
            }

            if (part.type === 'tool-getWeather') {
                switch (part.state) {
                  case 'input-available':
                    return <div key={index}>tool call: getting the weather...</div>;
                  case 'output-available':
                    return (
                      <ShowWeatherTool key={index} weather={part.output.message} />
                    );
                  case 'output-error':
                    return <div key={index}>Error: {part.errorText}</div>;
                  default:
                    return null;
                }
              }
          })}
        </div>
      </div>
    );
  }