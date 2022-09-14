//? Add your boilerplate code for a controller
//? Create a route that is a POST ("/add")
//? Make sure route is working
//? Full url localhost:4000/movie/add
const router = require("express").Router();
const Movie = require("../models/movies.model");
const SeedData = require("../assets/seed.data.json");
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
});

// ? Build a route to get all the movie data ("/")
//? Method: GET
// ? Test the route
router.get("/", async (req, res) => {
  try {
    const movie = await Movie.find();
    res.json({ movie: movie });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//? Create a route for delting a movie
//? route endpoint will be ("/:id")
//? localhost:4000/movie/
//? Method: Delete

router.delete("/:id", async (req, res) => {
  console.log(req.params);
  try {
    const deletedMovie = await Movie.deleteOne({ _id: req.params.id });
    res.json({
      message:
        deletedMovie.deletedCount > 0 ? "movie removed" : "movie not found",

      deletedMovie: deletedMovie,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/insertAll", async (req, res) => {
  try {
    const insertedMovies = await Movie.insertMany(SeedData);
    res.json({ movies: insertedMovies });
  } catch (error) {
    res.json({ message: error.message });
  }
});
//? Build a route for updating a record (UPDATE or PATCH)
//? router.patch with endpoint of "/update/:id"
//? Validate with a console.log(req.params)
//? Full url  http://localhost:4000/movie/update/6321001b1537f4ec1450c738
// ! You supply the record ID in the url
//! In the body you supply what is needed to update.

router.patch("/update/:id", async (req, res) => {
  console.log(req.params);
  try {
    const filter = { _id: req.params.id };
    const dataToReplace = req.body.movie;
    const returnOptions = {
      returnOriginal: false,
    };
    const movie = await Movie.findOneAndUpdate(
      filter,
      dataToReplace,
      returnOptions
    );
    // const movie = await Movie.findById(req.params.id);

    // if (req.body.movie.rating) {
    //   movie.rating = req.body.movie.rating;
    // }
    // if (req.body.movie.movieTitle) {
    //   movie.movieTitle = req.body.movie.movieTitle;
    // }

    // if (req.body.movie.movieYear) {
    //   movie.movieYear = req.body.movie.movieYear;
    // }

    // movie.save();
    res.json({ message: "movie updated", movie: movie });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//? Create an endpoint that will get a record by it's id
//? Endpoint should be ("/:id")
//? Full URL is localhost:4000/movie/6320c5faa7bd064137bcfbcc
//? Method: GET
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json({ movie: movie });
  } catch (error) {
    res.json({ message: error.message });
  }
});
module.exports = router;
