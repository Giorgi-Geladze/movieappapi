const { z } = require("zod");


exports.movieSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  releaseDate: z.string().optional(),
  category: z.string().optional()
});
