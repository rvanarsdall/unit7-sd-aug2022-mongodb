//? Add your boilerplate code for a controller
//? Create a route that is a POST ("/add")
//? Make sure route is working
//? Full url localhost:4000/movie/add
const router = require("express").Router();
const Movie = require("../models/movies.model");

router.post("/add", async (req, res) => {
  console.log(req.body);
  const {
    movieTitle,
    movieDescription,
    movieYear,
    isCurrentlyInTheaters,
    rating,
  } = req.body.movie;
  const movie = new Movie({
    movieTitle,
    movieDescription,
    movieYear,
    isCurrentlyInTheaters,
    rating,
  });

  try {
    const newMovie = await movie.save();
    res.json({ movie: newMovie });
  } catch (error) {
    res.json({ message: error.message });
  }

  res.json({ message: "hello from /add" });
});

module.exports = router;
