'use client';
// Mark this as a Client Component in Next.js (runs in the browser)

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
// Import hooks:
// - useChat: manages AI chat (messages, send, stop, status, error)
// - useState: standard React state hook

export default function ChatPage() {
  const [input, setInput] = useState('');
  // State for storing the user's input text

  const { messages, sendMessage, status, error, stop } = useChat();
  // Destructure the chat hook:
  // - messages: array of messages in the conversation
  // - sendMessage({ text }): send new message to AI
  // - status: 'ready' | 'submitted' | 'streaming'
  // - error: error object if request fails
  // - stop: function to stop streaming responses

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    sendMessage({ text: input }); // Send the current input to AI
    setInput(''); // Clear input field
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error && <div className="text-red-500 mb-4">{error.message}</div>}
      {/* Display error if any */}

      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <div className="font-semibold">
            {message.role === 'user' ? 'You:' : 'AI'}
            {/* Show 'You:' for user, 'AI' for assistant */}
          </div>

          {message.parts.map((part, index) => {
            // Each message can have multiple parts (text, code, image, etc.)
            switch (part.type) {
              case 'text':
                return (
                  <div
                    key={`${message.id}-${index}`}
                    className="whitespace-pre-wrap"
                  >
                    {part.text} {/* Render text content */}
                  </div>
                );
              default:
                return null; // Ignore unsupported types
            }
          })}
        </div>
      ))}

      {(status === 'submitted' || status === 'streaming') && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            {/* Spinner while AI is generating response */}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div className="flex gap-2">
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            placeholder="How can I help you?"
            value={input} // Bind input value to state
            onChange={(e) => setInput(e.target.value)} // Update state on typing
          />

          {status === 'submitted' || status === 'streaming' ? (
            <button
              onClick={stop} // Stop streaming response
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status != 'ready'} // Disable if AI not ready
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Example message object structure:
/*
message = {
  id: '123',           // Unique message ID
  role: 'assistant',   // 'user' or 'assistant'
  parts: [             // Array of parts (pieces of content)
    { type: 'text', text: 'Hello!' },          // Text part
    { type: 'code', text: 'console.log("Hello World");' }, // Code part
  ],
};
*/
// Each 'part' can have a different type (text, code, image) and is rendered accordingly.
