//? Add your boilerplate code for a controller
//? Create a route that is a POST ("/signup")
//? Make sure route is working
//? Full url localhost:4000/user/signup

const SUCCESS_MESSAGE = "success";

const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/signup", async (req, res) => {
  console.log(req.body.user.firstName);
  const user = new User({
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 10),
    // password: req.body.user.password,
  });

  try {
    const newUser = await user.save();
    //? Generate a token after the new user is created
    let token = jwt.sign({ id: newUser._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 24,
    });
    res.json({ user: newUser, token: token, message: SUCCESS_MESSAGE });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//? Create a ('/login') route POST
//? Make sure the route is working
//? Full url: localhost:4000/user/login
//? Try to console log the email in the route

router.post("/login", async (req, res) => {
  console.log(req.body.user.email);
  try {
    //? This is where the query is happening and storing it into a variable called 'user'
    const user = await User.findOne({ email: req.body.user.email });
    if (user) {
      //! We got a user back
      //! Do the passwords match!!!
      const passwordsMatch = await bcrypt.compare(
        req.body.user.password,
        user.password
      );
      console.log(passwordsMatch);
      if (passwordsMatch) {
        //? Passwords do match
        let token = jwt.sign({ id: user._id }, process.env.JWT, {
          expiresIn: 60 * 60 * 24,
        });
        res.json({ message: "user found", user: user, token: token });
      } else {
        //? Passwords do not match
        res.json({ message: "password mismatch" });
      }
    } else {
      //! Zero docuements founds (AKA Records)
      res.json({ message: "user not found", user: user });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
