'use client';
// Marks this component as a Client Component in Next.js 13+
// This ensures it runs in the browser, not on the server

import { useState } from 'react';
// Import React's useState hook to manage local component state

import { experimental_useObject as useObject } from '@ai-sdk/react';
// Import the experimental useObject hook from the AI SDK
// Renaming it to "useObject" for easier use
// This hook handles structured AI API calls with schema validation

import { recipeSchema } from '@/app/api/structured-data/schema';
// Import the Zod schema that defines the structure of a recipe
// This schema ensures the AI response matches the expected format

export default function StructuredDataPage() {
  // Define the main React component for the page
  const [dishName, setDishName] = useState('');
  // Create state to store the user's input for the dish name

  const { submit, object, isLoading, error, stop } = useObject({
    api: '/api/structured-data',
    schema: recipeSchema,
  });
  // Initialize the useObject hook:
  // - `submit`: function to send input to the API
  // - `object`: the AI-generated response following the schema
  // - `isLoading`: true while waiting for a response
  // - `error`: stores any errors from the request
  // - `stop`: function to stop a streaming response

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent the default form submission behavior (page reload)

    submit({ dish: dishName });
    // Send the user's dish name to the API

    setDishName('');
    // Clear the input field after submission
  };

  return (
    <div className="flex flex-col w-full max-w-2xl pt-12 pb-24 mx-auto">
      {/* Main container: centered, max width, vertical padding */}

      {error && <div className="text-red-500 mb-4 px-4">{error.message}</div>}
      {/* Display error message if an error occurred */}

      {object?.recipe && (
        <div className="space-y-6 px-4">
          <h2 className="text-2xl font-bold">{object.recipe.name}</h2>
          {/* Display the recipe name */}

          {object?.recipe?.ingredients && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
              <div className="grid grid-cols-2 gap-4">
                {object.recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg"
                  >
                    <p className="font-medium">{ingredient?.name}</p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {ingredient?.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Display all ingredients in a 2-column grid with styled cards */}

          {object?.recipe?.steps && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Steps</h3>
              <ol className="space-y-4">
                {object.recipe.steps.map((step, index) => (
                  <li
                    key={index}
                    className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg"
                  >
                    <span className="font-medium mr-2">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {/* Display the steps in an ordered list with styling */}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-2xl mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        {/* Fixed input form at the bottom of the screen with styling */}

        <div className="flex gap-2">
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="Enter a dish name..."
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
          />
          {/* Input field for entering the dish name */}

          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !dishName}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          )}
          {/* Conditional button:
              - "Stop" appears if a request is in progress
              - "Generate" appears otherwise
              - Disabled when input is empty or loading */}
        </div>
      </form>
    </div>
  );
}
