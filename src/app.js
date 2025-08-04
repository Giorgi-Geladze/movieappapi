const express = require('express');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const routes = {
  auth: require('./routes/authRoutes'),
  movies: require('./routes/movieRoutes'),
  categories: require('./routes/categoryRoutes'),
  comments: require('./routes/commentRoutes'),
  favorites: require('./routes/favoriteRoutes'),
  users: require('./routes/userRoutes'),
};

const app = express();
app.use(express.json());

// API endpoints
app.use('/api/auth', routes.auth);
app.use('/api/movies', routes.movies);
app.use('/api/categories', routes.categories);
app.use('/api/comments', routes.comments);
app.use('/api/favorites', routes.favorites);
// app.use('/api/users', routes.users); // მომავალი პროექტისთვის მჭირდება

// Central error handler
app.use(errorHandler);

module.exports = app;