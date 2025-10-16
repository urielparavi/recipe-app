import { generateText } from 'ai';
// Import the function used to generate text via AI

import { openai } from '@ai-sdk/openai';
// Import the OpenAI model provider

export async function POST(req: Request) {
  // Define the POST handler for this route
  try {
    const { prompt } = await req.json();
    // Parse the incoming JSON body and extract the "prompt" field

    const { text } = await generateText({
      // Call the AI text generation function
      model: openai('gpt-4.1-nano'),
      // Specify which OpenAI model to use
      prompt,
      // Pass the prompt received from the client
    });

    return Response.json({ text });
    // Return the generated text as a JSON response
  } catch (error) {
    console.log('Error generating text:', error);
    // Log any errors to the server console for debugging

    return Response.json({ error: 'Failed to generate text' }, { status: 500 });
    // Return an error response with HTTP status 500
  }
}
