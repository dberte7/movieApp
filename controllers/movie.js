const Users = require('../models/users')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
  //token
 var privateKey = '674764936526529';



//
const Film = require("../models/Film");
const movies = require("../utils/movies");
const getMoviesToDB = require('../utils/getMoviesToDB');
const apikey = process.env.API_KEY;
//Variable user temporal
let user = false;
let admin = true;

let data3;

const routes = {
  
  addUser: async (req, res) => { 
  //var token = jwt.signUP({ email: req.body.email }, privateKey, { algorithm: 'RS256'});
//console.log(token)


  const {name,email,password} = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const entry =[name,email,hashedPassword]
  
    try {
      const data = await Users.createUser(entry)
      res.status(201).json({ data, status:"usuario creado" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
},


signUP: (req, res) => {

  res.status(200).render("signUp", { signIn: true });
  //res.status(200).render("singin", { dashboard: true });
},
  dashboard: (req, res) => {
    res.status(200).render("movies", { dashboard: true });
  },
  getMovies: async (req, res) => {
    let titleQ = req.query.s;
    let search = [];
    if (titleQ === undefined) {
      res.status(200).render("movies", { searchPage: true, burger: true });
    } else {
      try { // primero fech luego bd
        let data = await movies.getfilm(
          `http://www.omdbapi.com/?s=${titleQ}&type=movie&apikey=${apikey}&`
        );
        if (data.Response === false) {
          // comprobar en la base de datos y si no hay resultados dar error.
          res.status(500).json({ message: `${data.Error}` });
        } else {
          for (let index = 0; index < data.Search.length; index++) {
            let id = data.Search[index].imdbID;
            let data2 = await movies.getfilm(
              `http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`
            );
            search.push(data2);
          }
          // comprobar en la base de datos
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
        res.status(200).render("movies", { searchPage: true, burger: true, search: search });
    }
  },
  searchTitle: async (req, res) => {
    let id = req.params.title;
    try{
      let data = await movies.getfilm(
        `http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
        res.status(200).render("movies", { detail: true, burger: true, data: data });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
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
      let id = req.body
      try {

        const data = await Film.find({_id:id});
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
              console.log(result);
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
          const data = await Film.findOneAndRemove({ _id: deleteMov._id })
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    },
    myMovies: async (req, res) => {
      if (user) {
        try {
          const data = await Film.find({ fav: "true" });
          res.status(200).render("movies", { movies: true, burger: true, data: data });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      } else if (admin) {
        try {
          const data = await Film.find();
          await res.status(200).render("admin", { movies: true, data: data, data3: data3 });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
      },
};
module.exports = routes;





