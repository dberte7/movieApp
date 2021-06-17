const router = require('express').Router(); 
const movie = require('../controllers/movie');

router.get('/', movie.signIn)
router.get('/dashboard', movie.dashboard)
router.post('/dashboard', movie.dashboard)
router.get('/search', movie.getMovies)
router.post('/search', movie.getMovies)
router.get('/search/:title', movie.searchTitle)
router.get('/movies', movie.myMovies)
router.post('/movies', movie.myMovies) // falta get para que pinte 
router.post('/createMovie', movie.postMovie)
router.post('/editMovie', movie.editMovie)
router.put('/editMovie/:id', movie.putMovie)
router.post('/removeMovie', movie.deleteMovScreen)
router.delete('/removeMovie', movie.deleteMovie)

module.exports = router;