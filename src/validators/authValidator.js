const { z } = require('zod');

exports.authSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6).max(12)
});

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(12)
});
