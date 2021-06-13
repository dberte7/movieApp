const router = require('express').Router(); 
const movie = require('../controllers/admin');

router.get('/movies', movie.movies)
router.post('/movies', movie.getAllMovies)
router.get('/createmovie', movie.createMovie)
router.post('/createmovie', movie.postMovie)
// router.put('/editmovie/:id', movie.editMovie)
// router.delete('/removemovie', movie.deleteMovie)

module.exports = router;