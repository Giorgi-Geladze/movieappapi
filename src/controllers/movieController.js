const Movie = require('../models/movie');

async function searchMovies(req, res) {
  try {
      const query = await req.query.query
      if(!query){
        return res.status(400).json({ message: "Query parameter is required" });
      }

      const movies = await Movie.find({
        title: {$regex: query, $options: "i"} // მეორე არის არამგრძნოებიარე დიდ და პატარა ტექსტებზე 
      })

      res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getAll(req, res, next) {

  try {
    const movies = await Movie.find().populate('category author', 'name username');
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

async function getOne(req, res, next) {

  try {
    const movie = await Movie.findById(req.params.id).populate('category author');
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

async function create(req, res, next) {
  try {
    const data = { ...req.body, author: req.user.id };
    const movie = await Movie.create(data);
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
};

async function update(req, res, next) {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

async function remove(req, res, next) {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};


module.exports = {searchMovies, getAll, getOne, create, update, remove}