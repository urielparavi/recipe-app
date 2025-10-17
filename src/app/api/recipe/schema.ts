import { z } from 'zod';

export const recipeSchema = z.object({
  recipe: z.object({
    name: z.string(),

    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
      })
    ),
    steps: z.array(z.string()),
    servings: z.number().optional(),
    cookTime: z.string().optional(),
    difficulty: z.string().optional(),
    tips: z.string().optional(),
    description: z.string().optional(),
  }),
});
