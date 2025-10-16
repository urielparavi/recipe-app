// Import the streamText function used to create a streaming AI response.
// This function allows you to receive the model's response in real time (streaming).
import { streamText } from 'ai';

// Import the OpenAI model configuration helper.
// This helper is used to select and configure the OpenAI model provider.
import { openai } from '@ai-sdk/openai';

// Optionally, you could use an Anthropic model instead of OpenAI.
// import { anthropic } from '@ai-sdk/anthropic';

// Define the POST handler for this API route.
// This function is triggered when a POST request is made to this endpoint.
export async function POST(req: Request) {
  try {
    // Parse the JSON body of the incoming request and extract the "prompt" value.
    // This assumes the client sends JSON with a "prompt" field.
    const { prompt } = await req.json();

    // Create a streaming response using the specified AI model and prompt.
    // The model processes the given prompt and returns the output in real time.
    const result = streamText({
      // You could switch to an Anthropic model by uncommenting the line below:
      // model: anthropic('claude-sonnet-4-20250514'),
      model: openai('gpt-4.1-nano'), // Select the OpenAI GPT-4.1 Nano model.
      prompt, // Pass the user's input prompt to the AI model.
    });

    // The "usage" property returns a Promise that resolves after the streaming finishes.
    // It provides details about token consumption during the request.
    result.usage.then((usage) => {
      // Example returned data: { inputTokens: 14, outputTokens: 66, totalTokens: 80 }
      // Useful for logging and tracking costs in production environments.
      console.log({
        inputTokens: usage.inputTokens, // Number of tokens sent to the model.
        outputTokens: usage.outputTokens, // Number of tokens generated in the response.
        totalTokens: usage.totalTokens, // Combined total of input + output tokens.
      });
    });

    // Convert the streaming result into a format compatible with Next.js API responses.
    // This enables the frontend to display streamed content progressively.
    return result.toUIMessageStreamResponse();
  } catch (error) {
    // If any part of the operation fails, log the error for debugging on the server.
    console.error('Error streaming text:', error);

    // Respond with a 500 status code to inform the client that something went wrong.
    return new Response('Failed to stream text', { status: 500 });
  }
}
