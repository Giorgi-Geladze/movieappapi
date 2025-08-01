const { z } = require("zod");


exports.favoriteSchema = z.object({
  movieId: z.string().min(1)
});
