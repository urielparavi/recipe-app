'use client';
// Marks this as a Client Component in Next.js, so it runs in the browser

import { useState } from 'react';
// Import useState hook from React to manage component state

export default function CompletionPage() {
  // Define the main React component for the page

  const [prompt, setPrompt] = useState('');
  // State to store the user input text
  const [completion, setCompletion] = useState('');
  // State to store the AI response text
  const [isLoading, setIsLoading] = useState(false);
  // State to track loading status while waiting for AI response
  const [error, setError] = useState<string | null>(null);
  // State to track errors; can be a string message or null

  const complete = async (e: React.FormEvent) => {
    // Function triggered when the form is submitted
    e.preventDefault();
    // Prevent the default form submission (page reload)

    setIsLoading(true);
    // Set loading state to true while waiting for response
    setPrompt('');
    // Clear the input field immediately

    try {
      const response = await fetch('/api/completion', {
        method: 'POST',
        // Specify HTTP method
        headers: {
          'Content-Type': 'application/json',
          // Tell the server we are sending JSON
        },
        body: JSON.stringify({ prompt }),
        // Convert the user prompt to JSON and send it in the request body
      });

      const data = await response.json();
      // Parse the JSON response from the server

      if (!response.ok) {
        // If HTTP status is not 2xx, throw an error
        throw new Error(data.error || 'Something went wrong.');
      }

      setCompletion(data.text);
      // Update the completion state with the AI response
    } catch (error) {
      console.log('Error', error);
      // Log errors to the console

      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong, please try again later.'
      );
      // Update the error state to display a message to the user
    } finally {
      setIsLoading(false);
      // Always turn off loading state when done
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {/* Main container with Tailwind styling */}

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {/* Show error message if exists */}

      {isLoading ? (
        <div>Loading...</div>
      ) : completion ? (
        <div className="whitespace-pre-wrap">{completion}</div>
      ) : null}
      {/* Display Loading, AI completion, or nothing */}

      <form
        onSubmit={complete}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        {/* Fixed form at the bottom of the page */}

        <div className="flex gap-2">
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            placeholder="How can I help you?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {/* Text input bound to prompt state */}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Send
          </button>
          {/* Submit button disabled while loading */}
        </div>
      </form>
    </div>
  );
}
