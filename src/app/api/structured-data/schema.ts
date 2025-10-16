import { z } from 'zod';
// Import the Zod library for schema validation

export const recipeSchema = z.object({
  // Define and export a schema named "recipeSchema" as a Zod object
  recipe: z.object({
    // The top-level "recipe" field is itself an object
    name: z.string(),
    // "name" must be a string

    ingredients: z.array(
      // "ingredients" must be an array
      z.object({
        // Each item in the array must be an object with the following fields:
        name: z.string(),
        // Ingredient name must be a string
        amount: z.string(),
        // Ingredient amount must be a string (e.g., "2 cups", "1 tbsp")
      })
    ),

    steps: z.array(z.string()),
    // "steps" must be an array of strings, each string is a step in the recipe
  }),
});
