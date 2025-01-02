import yupSchema from "../utils/yupSchema.js";

const validtion = async (req, res, next) => {
  try {
    await yupSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const validationErr = {};
    error.inner.forEach((err) => {
      const { path, message } = err;
      validationErr[path] = message;
    });

    res.status(400).json({ validationErr });
  }
};

export default validtion;
