
const { z } = require("zod");

exports.commentSchema = z.object({
  movie: z.string().min(1),
  text: z.string().min(1)
});