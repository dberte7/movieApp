const movies = require('../utils/movies');
const apiKey = process.env.API_KEY;

const routes = {
    home:(req, res) => {
        res.status(200).send('vista inicial/login')
    },
    // getSingUp: ,
    // postSingUp: ,
    // login:,
    // logout:,
    dashboard:(req, res) => {
        res.status(200).render('dashboard')
    },
     getMovies: async (req,res) => {
        res.render('search')

     },

     film:async(req, res) => {
        console.log(req.body.title);
        let data = await film.getfilm(`http://www.omdbapi.com/?t=${req.body.title}&apikey=${apikey}&`)
        console.log(data);
        res.status(200).render('film', {data})
     },

    searchByTitle: async(req, res) => {
        let data = await film.getfilm(`http://www.omdbapi.com/?t=${req.params.title}&apikey=${apiKey}&`)
        console.log(data);
        res.status(200).render('film', {data})
    },
    myMovies:async(req, res) => {
        res.render('movies')
    },
    createMovie: async (req, res) => {
        res.status(200).json({message: 'Se ha guardado'})
    },
    editMovie: (req, res) =>{
        let id = req.params.id
        res.status(200).json({message: `Se ha actualizado: ${id}`})
    },
    deleteMovie: (req, res) =>{
        res.status(200).json({message: 'Se ha borrado'})
    }
}

module.exports = routes;

