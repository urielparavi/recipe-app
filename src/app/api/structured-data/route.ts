import { streamObject } from 'ai';
// Import the streamObject helper to generate streamed AI responses as structured objects

import { openai } from '@ai-sdk/openai';
// Import the OpenAI model helper to select and configure a specific OpenAI model

import { recipeSchema } from './schema';
// Import the Zod schema that validates and structures the AI-generated recipe output

export async function POST(req: Request) {
  // Define an async POST handler function that receives an HTTP Request object
  try {
    const { dish } = await req.json();
    // Parse the JSON body of the request and extract the "dish" field

    const result = streamObject({
      // Call streamObject to create a streamed AI response with structured output
      model: openai('gpt-4.1-nano'),
      // Specify which OpenAI model to use (in this case: gpt-4.1-nano)
      schema: recipeSchema,
      // Provide the schema to ensure the response matches the expected recipe structure
      prompt: `Generate a recipe for ${dish}`,
      // Define the prompt sent to the model, dynamically inserting the requested dish
    });

    return result.toTextStreamResponse();
    // Convert the streamed result into a text-based HTTP response and return it
  } catch (error) {
    console.error('Error generating recipe:', error);
    // Log any errors that occur during processing for debugging purposes

    return new Response('Failed to generate recipe', { status: 500 });
    // Return an HTTP 500 response if something goes wrong
  }
}
