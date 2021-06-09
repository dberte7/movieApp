const movies = require('../utils/movies');
const apiKey = process.env.API_KEY;

const routes = {
    home:(req, res) => {
        console.log("hola")
        res.status(200).send('vista inicial/login')
    },
    dashboard:(req, res) => {
        res.status(200).send('dashboard')
    }
/*     searchMovie:, */
    /* searchMovies:,
    myMovies:,
    login:,
    logout:,
    createMovie:,
    editMovie:,
    deleteMovie: */
}

module.exports = routes;
/* films:async(req, res) => {
    console.log(req.body.title);
    let data = await filmData.getfilm(`http://www.omdbapi.com/?t=${req.body.title}&apikey=${apikey}&`)
    console.log(data);
    res.status(200).render('film', {data})
},
searchFilm:async(req, res) => { //ALEJANDRO
    let data = await filmData.getfilm(`http://www.omdbapi.com/?t=${req.params.title}&apikey=${apikey}&`)
    console.log(data);
    res.status(200).render('film', {data})
},
postFilm:async(req, res) => {
    res.redirect(`/film/${req.body.title2}`)
}, */