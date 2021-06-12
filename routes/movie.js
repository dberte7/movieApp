const router = require('express').Router(); 
const movie = require('../controllers/movie');

router.get('/', movie.home)
// router.get('/signup', movie.getSingUp)
// router.post('/signup', movie.postSingUp)
// router.post('/login', movie.login)
// router.post('/logout', movie.logout)
router.get('/dashboard', movie.dashboard)
router.get('/search', movie.getMovies)
router.get('/search/:title', movie.searchTitle)
router.get('/movies', movie.myMovies)
<<<<<<< HEAD
router.get('/createmovie', movie.createMovie)
router.post('/createmovie', movie.postMovie)
// router.put('/editmovie/:id', movie.editMovie)
// router.delete('/removemovie', movie.deleteMovie)
=======
router.get('/adminTemp', movie.getAllMovies)
router.post('/createmovie', movie.createMovie)
router.put('/editmovie/:id', movie.editMovie)
router.delete('/removemovie', movie.deleteMovie)
>>>>>>> develop

module.exports = router;