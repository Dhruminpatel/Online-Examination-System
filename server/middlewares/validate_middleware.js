const validate = schema => async (req, res, next) => {
  try {
    const parsebody = await schema.parseAsync(req.body);
    req.body = parsebody;
    next();
  } catch (err) {
    const status = 422;
    const message = 'fill the input fileds';
    const extraDetails = err.errors[0].message;
    const error = { status, message, extraDetails };
    console.log(message);
    // res.status(400).json({ message: message });
    next(error);
  }
};

module.exports = validate;
