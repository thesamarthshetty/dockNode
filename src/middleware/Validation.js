export const Validation = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      return res.status(400).json({
        success: false,
        errors: err,
      });
    }
  };
};
