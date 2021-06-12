const router = require('express').Router();
const movie = require('../controllers/movieApi')

router.get('/search', movie.getMovies)
router.get('/search/:title', movie.searchTitle)

module.exports = router;