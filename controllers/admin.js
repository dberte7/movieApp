const Film = require('../models/Film');
const movies = require('../utils/movies');
const getMoviesToDB = require('../utils/getMoviesToDB');
const apikey = process.env.API_KEY;

const routes = {
    movies:  (req, res) => {
        res.status(200).render('admin')
    },
    getAllMovies: async (req, res) => {
        try {
            const data = await Film.find();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createMovie:  (req, res) => {
        res.status(200).render('create')
    },
    postMovie: (req, res) => {
        // res.render('create')
        res.redirect('/movies')
        // res.status(200).json({message: 'Se ha guardado'})
    },
    // editMovie: (req, res) =>{
    //     let id = req.params.id
    //     res.status(200).json({message: `Se ha actualizado: ${id}`})
    // },
    // deleteMovie: (req, res) =>{
    //     res.status(200).json({message: 'Se ha borrado'})
    // }
}

module.exports = routes;