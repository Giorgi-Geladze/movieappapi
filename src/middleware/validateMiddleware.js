// exports.validateBody = (schema) => (req, res, next) => {
//   const result = schema.safeParse(req.body);
//   if (!result.success) {
//     const errors = result.error.errors.map(e => `${e.path.join('.')} - ${e.message}`);
//     return res.status(400).json({ message: 'Validation failed', errors });
//   }
//   req.body = result.data;
//   next();
// };

exports.validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    console.log('Validation error details:', result.error);
    const errors = result.error?.errors
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  req.body = result.data;
  next();
};

