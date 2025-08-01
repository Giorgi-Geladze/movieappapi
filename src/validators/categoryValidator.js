const { z } = require("zod");


exports.categorySchema = z.object({
  name: z.string().min(1).max(30)
});