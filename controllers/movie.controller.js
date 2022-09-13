//? Add your boilerplate code for a controller
//? Create a route that is a POST ("/add")
//? Make sure route is working
//? Full url localhost:4000/movie/add
const router = require("express").Router();

router.post("/add", (req, res) => {
  res.json({ message: "hello from /add" });
});

module.exports = router;
