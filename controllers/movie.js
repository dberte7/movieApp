const Users = require('../models/users')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
//token
var privateKey = '674764936526529';

const Film = require("../models/Film");
const movies = require("../utils/movies");
const getMoviesToDB = require('../utils/getMoviesToDB');
const rol = require('../utils/fake/userOrAdmin');
const logged = require('../utils/fake/userLoggedIn');
const apikey = process.env.API_KEY;

//Variable global
let data3;
let search = []; 

const routes = {
  signIn: (req, res) =>{
    console.log("Test");
    console.log(req.body);
    rol.admin? res.redirect('/movies') : res.redirect('/dashboard')
  },
  inicio: (req, res) => {
    res.status(200).render("movies", { signIn: true, title:true });
  },
  addUser: async (req, res) => { 
  //var token = jwt.signUP({ email: req.body.email }, privateKey, { algorithm: 'RS256'});
  //console.log(token)
  const {name,email,password} = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const entry =[name,email,hashedPassword]
    try {
      const data = await Users.createUser(entry)
      console.log({ data, status:"usuario creado" });
      res.redirect('/')
    } catch (err) {
      console.log({ message: err.message });
    }
  },
  signUp: (req, res) => {
    res.status(200).render("movies", { signUp: true,title:true});
    //res.status(200).render("singin", { dashboard: true });
  },
  dashboard: (req, res) => {
    res.status(200).render("movies", { dashboard: true, headerGen:true});
  },
  getMovies: async (req, res) => {
    let titleQ = req.query.s;
    
    if (titleQ === undefined) {
      res.status(200).render("movies", { searchPage: true, burger: true, title:true });
    } else {
      Film.exists({ Title: titleQ }, async (err, result) => {
        if (err) {
            console.log(error);
        } else {
            if (!result){
              let data = await movies.getfilm(`http://www.omdbapi.com/?s=${titleQ}&type=movie&apikey=${apikey}&`);
              for (let index = 0; index < data.Search.length; index++) {
                      let id = data.Search[index].imdbID;
                      let data2 = await movies.getfilm(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
                      search.push(data2);
                    }
                    res.status(200).render("movies", { searchPage: true, burger: true, search: search });
            } else {
              const dataDb = Film.findOne({Title:titleQ}).lean().exec(async (err, movie) => {
                        let dbSearch = {
                            Title: movie.Title,
                            Year: movie.Year,
                            Runtime: movie.Runtime,
                            Genre: movie.Genre,
                            Director: movie.Director,
                            Poster: movie.Poster,
                            imdbID: movie._id,
                        }
                        res.status(200).render("movies", { searchPage: true, burger: true, dbSearch: dbSearch });
                      })
            }
        }
    })
    }
  },
  searchTitle: async (req, res) => {
    let id = req.params.title;
    try{
      let data = await movies.getfilm(
        `http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
        // scrap(data.Title)
        res.status(200).render("movies", { detail: true, burger: true, data: data });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  fav: async (req, res) =>{
    let fav = req.body
    console.log("**********");
    console.log(fav);
  },
    postMovie: (req, res) => {
      const newMovie = req.body
        if (!newMovie.Create) {
          res.status(200).render('admin', {create: true})
        } else if (newMovie.Create) {
          data3 = newMovie;
          getMoviesToDB.arrayToDB(newMovie);
        } 
    },
    editMovie: async (req, res) => {
      let title = req.body
        try {
          const data = await Film.findOne({Title:title.Title});
          await res.status(200).render("admin", { edit: true, data: data });
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  },
    putMovie: async (req, res) => {
      const editMovie = req.body
      try{
        const data = await Film.findByIdAndUpdate({_id:editMovie._id}, editMovie, (err, result) => {
          if(err){
              console.log(err);
          }
          else{
            data3 = undefined;
          }
      })
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
    deleteMovScreen: async (req, res) => {
      const deleteMov = req.body
      res.status(200).render('admin', { remove: true, deleteMov: deleteMov })
    },
    deleteMovie: async (req, res) => {
      const deleteMov = req.body;
        try {
          const data = await Film.findOneAndRemove({ Title: deleteMov.Title })
          data3 = undefined;
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    },
    myMovies: async (req, res) => {
      if (!rol.admin) {
        try {
          const data = await Film.find({ fav: "true" });
          res.status(200).render("movies", { movies: true,headerGen: true, burger: true, data: data });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      } else if (rol.admin) {
        try {
          const data = await Film.find();
          res.status(200).render("admin", { movies: true, data: data, data3: data3 })
          data3 = undefined;
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
      },
};

module.exports = routes;