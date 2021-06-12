const movies = require('../utils/movies');
const apiKey = process.env.API_KEY;
const User = require("../models/User");

const routes = {
    home:(req, res) => {
        res.status(200).render('login')
    },
    posty:(req,res) =>{
        let body = req.body
        //res.send(body)
        res.status(200).redirect(`/dashboard`)
        console.log(body)
        return body
    },
     getSingUp:(req, res) => {
        res.status(200).render('signup')
    },
    postSingUp:async (req, res) => {
        const user = new User({
          email: req.body.email,
          password: req.body.password
        });
        try {
          const newUser = await user.save();
          res.status(201).json({ newUser });
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      },
      
    
    // login:,
    // logout:,




                dashboard:(req, res) => {
                    res.status(200).send('dashboard')
                },
                // getMovies:,
                searchTitle: async(req, res) => {
                    let data = await film.getfilm(`http://www.omdbapi.com/?t=${req.params.title}&apikey=${apiKey}&`)
                    console.log(data);
                    res.status(200).json(data)
                },
                // myMovies:,
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