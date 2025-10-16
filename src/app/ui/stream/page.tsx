'use client';
// Marks this file as a Client Component in Next.js (runs in the browser)

import { useCompletion } from '@ai-sdk/react';
// Import the useCompletion hook for handling AI streaming responses

export default function CompletionStreamPage() {
  // Destructure useful values and functions returned by useCompletion
  const {
    completion, // The AI-generated text response
    input, // The current value of the input field
    handleInputChange, // Updates the input value when typing
    handleSubmit, // Sends the prompt to the API
    isLoading, // Indicates if the request is in progress
    error, // Holds any error that occurs during the request
    stop, // Function to stop streaming the response
    setInput, // Manually set or clear the input value
  } = useCompletion({
    api: '/api/stream', // Endpoint where the request will be sent
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {/* Show the error message if an error exists */}
      {error && <div className="text-red-500 mb-4">{error.message}</div>}

      {/* Show a loading message when waiting for the first response chunk */}
      {isLoading && !completion && <div>Loading...</div>}

      {/* Display the streamed AI response */}
      {completion && <div className="whitespace-pre-wrap">{completion}</div>}

      {/* Form for submitting user input */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload
          setInput(''); // Clear the input field
          handleSubmit(e); // Trigger the streaming request
        }}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div className="flex gap-2">
          {/* Input field for the user's prompt */}
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            value={input} // Bind the input value
            onChange={handleInputChange} // Update the value on user typing
            placeholder="Ask me anything"
          />

          {isLoading ? (
            // If the AI is streaming a response, show a Stop button
            <button
              onClick={stop} // Stop streaming on click
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          ) : (
            // If not loading, show the Send button
            <button
              type="submit" // Submit the form
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading} // Disable button while loading
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
