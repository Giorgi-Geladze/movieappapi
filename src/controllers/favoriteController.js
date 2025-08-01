const Favorite = require('../models/Favorite');

async function getAll(req, res, next) {

  try {
    const favs = await Favorite.find({ user: req.user.id }).populate('movie');
    res.json(favs);
  } catch (err) { next(err); }
};

async function toggle(req, res, next) {

  try {
    const { movieId } = req.body;
    const exists = await Favorite.findOne({ user: req.user.id, movie: movieId });
    if (exists) {
      await exists.remove();
      return res.json({ message: 'Removed from favorites' });
    }
    await Favorite.create({ user: req.user.id, movie: movieId });
    res.json({ message: 'Added to favorites' });
  } catch (err) { next(err); }
};


module.exports = {getAll, toggle}