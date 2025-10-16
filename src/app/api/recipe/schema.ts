// import { z } from 'zod';
// // Import the Zod library for schema validation

// export const recipeSchema = z.object({
//   // Define and export a schema named "recipeSchema" as a Zod object
//   recipe: z.object({
//     // The top-level "recipe" field is itself an object
//     name: z.string(),
//     // "name" must be a string

//     ingredients: z.array(
//       // "ingredients" must be an array
//       z.object({
//         // Each item in the array must be an object with the following fields:
//         name: z.string(),
//         // Ingredient name must be a string
//         amount: z.string(),
//         // Ingredient amount must be a string (e.g., "2 cups", "1 tbsp")
//       })
//     ),

//     steps: z.array(z.string()),
//     // "steps" must be an array of strings, each string is a step in the recipe
//   }),
// });

import { z } from 'zod';
// Import the Zod library for schema validation

export const recipeSchema = z.object({
  // Define and export a schema named "recipeSchema" as a Zod object
  recipe: z.object({
    // The top-level "recipe" field is itself an object

    name: z.string(),
    // "name" must be a string
    // Example: "Roast Chicken with Vegetables"

    ingredients: z.array(
      // "ingredients" must be an array
      z.object({
        name: z.string(),
        // Ingredient name must be a string
        // Example: "Chicken", "Onion"

        amount: z.string(),
        // Ingredient amount must be a string (can include units)
        // Example: "500g", "2 tbsp olive oil"
      })
    ),

    steps: z.array(z.string()),
    // "steps" must be an array of strings, each string is a step in the recipe
    // Example: ["Preheat the oven to 180°C", "Sauté the onions until golden"]

    servings: z.number().optional(),
    // Optional: Number of servings the recipe yields
    // Example: 4

    cookTime: z.string().optional(),
    // Optional: Preparation or cooking time
    // Example: "45 minutes", "1 hour"

    difficulty: z.string().optional(),
    // Optional: Difficulty level of the recipe
    // Example: "Easy", "Medium", "Hard"

    tips: z.string().optional(),
    // Optional: Chef's tips for best results
    // Example: "Prepare all ingredients before starting to cook"

    description: z.string().optional(),
    // Optional: Short description or general notes about the recipe
    // Example: "A classic homemade recipe perfect for a family meal"
  }),
});
