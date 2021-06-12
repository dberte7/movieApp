const Film = require('../models/Film');
const movies = require('../utils/movies');

const User = require("../models/User");
const getMoviesToDB = require('../utils/getMoviesToDB');
const apikey = process.env.API_KEY;


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
        res.status(200).render('signup')},
    // getSingUp: ,
    // postSingUp: ,
    // login:,
    // logout:,
    dashboard:(req, res) => {
        res.status(200).send('dashboard')
    },
    getMovies: async (req, res)=>{
        let titleQ = req.query.s
        let search = [];
        Film.exists({ searchKeyword: titleQ.toLowerCase() }, async (err,result)=>{
            if(err){
                console.log(error);
            } else {
                if(result){
                    try {
                        const data = await Film.find({ searchKeyword:titleQ.toLowerCase() });
                        console.log("base de datos");
                        res.status(200).json(data); 
                    } catch (err) {
                        res.status(500).json({ message: err.message });
                    }
                } else {
                    try {
                        let data = await movies.getfilm(`http://www.omdbapi.com/?s=${titleQ}&type=movie&apikey=${apikey}&`);
                        if (data.Response === false){
                            res.status(500).json({ message: `${data.Error}`});
                        } else {
                            for (let index = 0; index < data.Search.length; index++) {
                                let id = data.Search[index].imdbID;
                                let data2 = await movies.getfilm(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
                                search.push(data2);
                                getMoviesToDB.arrayToDB(data2, titleQ);
                            }
                            res.status(200).json(search);
                        }
                    } catch (err) {
                        res.status(500).json({ message: err.message });
                    }
                }
                
            }
        })
        
    },
    searchTitle: async(req, res) => {
        let titleQ = req.params.title
        let search = [];
        Film.exists({ searchKeyword: titleQ.toLowerCase() }, async (err,result)=>{
            if(err){
                console.log(error);
            } else {
                if(result){
                    try {
                        const data = await Film.find({ searchKeyword:titleQ.toLowerCase() });
                        console.log("base de datos");
                        res.status(200).json(data); 
                    } catch (err) {
                        res.status(500).json({ message: err.message });
                    }
                } else {
                    try {
                        let data = await movies.getfilm(`http://www.omdbapi.com/?s=${titleQ}&type=movie&apikey=${apikey}&`);
                        for (let index = 0; index < data.Search.length; index++) {
                            let id = data.Search[index].imdbID;
                            let data2 = await movies.getfilm(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
                            search.push(data2);
                            getMoviesToDB.arrayToDB(data2, titleQ);
                        }
                        res.status(200).json(search);
                    } catch (err) {
                        res.status(500).json({ message: err.message });
                    }
                }
                
            }
        })
    },
    getAllMovies: async (req, res) => {
        try {
            const data = await Film.find();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    myMovies:async (req, res) =>{
        try {
            const data = await Film.find({fav:"true"})
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    myMovies:async (req, res) =>{
        try {
            const data = await Film.find({fav:"true"})
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createMovie: async (req, res) => {
        res.status(200).json({message: 'Se ha guardado'})
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