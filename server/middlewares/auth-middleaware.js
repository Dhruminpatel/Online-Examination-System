const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res
      .status(401)
      .json({ message: 'unauthorised HTTP, token not provided' });
  }

  console.log(`token form auth middlewawre ${token}`);
  const JWTtoken = token.replace('Bearer', '').trim();
  console.log(`token form auth middlewawre after removing Bearer ${JWTtoken}`);

  try {
    const isVerified = jwt.verify(JWTtoken, process.env.JWT_SECRET_KEYS);
    console.log(isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (error) {
    console.error(`the error is ${error}`);
    return res
      .status(401)
      .json({ message: 'unauthorised HTTP, token not provided' });
  }
};
module.exports = authMiddleware;
