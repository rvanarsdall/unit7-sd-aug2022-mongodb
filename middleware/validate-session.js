const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const validateSession = async (req, res, next) => {
  //* make sure we can access the token provided from the request
  const token = req.headers.authorization;
  //  * make sure we have a valid token
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT);
    // console.log(decodedToken);

    //  * grab the users information from our database and store it in a variable (req.user)
    // ? how can I findById and it come back with a user.
    const user = await User.findById(decodedToken.id);

    // ? If we have a valid user that matches our DB create a global varable for the next function to use that containes the user information.
    if (user) {
      req.user = user;
      return next();
    } else {
      throw Error("user not found");
    }
  } catch (error) {
    res.json({ message: error.message });
  }

  req.test = "THIS IS A TEST";
};

module.exports = validateSession;
