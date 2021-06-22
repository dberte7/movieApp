const Users = require('../models/users')
const bcrypt = require('bcrypt')
const Film = require("../models/Film");
const JWT = require('jsonwebtoken');
const movies = require("../utils/movies");
const getMoviesToDB = require('../utils/getMoviesToDB');
const sc = require('../utils/scraping')
const apikey = process.env.API_KEY;
const mySecret = process.env.SECRET

//Variable global
let data3;
let search = [];

const routes = {
  signIn: (req, res) =>{
    req.body.admin===false? res.redirect('/dashboard') : res.redirect('/movies')
  },
  logout: async(req, res) => {
    await res.clearCookie('acces_token')
    res.redirect('/')
  },
  inicio: async (req, res) => {
    const token = req.cookies.acces_token || '';
    if (!token) {
      res.status(200).render("movies", { signIn: true, title:true })
    } else {
      try {
        const decrypt = await JWT.verify(token, mySecret);
        req.user = {
          id:decrypt.id,
          name:decrypt.name,
          admin:decrypt.admin
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
      req.user.admin===false? res.redirect('/dashboard') : res.redirect('/movies')
    }  
  },
  addUser: async (req, res) => { 
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
    console.log("Ya estoy aqui!!");
    console.log(req.user);
    res.status(200).render("movies", { dashboard: true, headerGen:true});
  },
  getMovies: async (req, res) => {
    console.log("Ya estoy aqui!!");
    console.log(req.user);
    let titleQ = req.query.s;
    if (titleQ === undefined) {
      res.status(200).render("movies", { searchPage: true, burger: true, title:true });
    } else {
      Film.exists({ Title: titleQ }, async (err, result) => {
        if (err) {
            console.log(error);
        } else {
            if (!result){
              search = []
              let data = await movies.getfilm(`http://www.omdbapi.com/?s=${titleQ}&type=movie&apikey=${apikey}&`);
              for (let index = 0; index < data.Search.length; index++) {
                      let id = data.Search[index].imdbID;
                      let data2 = await movies.getfilm(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
                      search.push(data2);
                    }
                    res.status(200).render("movies", { searchPage: true, title:true, burger: true, search: search });
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
                        res.status(200).render("movies", { searchPage: true, title:true, burger: true, dbSearch: dbSearch });
                      })
            }
        }
      })
    }
  },
  searchTitle: async (req, res) => {
    let userID = req.user.id
    let dataUser = {user_ID:userID}
    let id = req.params.title;
    //buscar si el usuario tiene la peli en favoritos y marcar el check al cargar el pug
    let exists = await Users.existsFav(["tt0372784",7])
    console.log(exists);
    let notest = true;
    try{
      let data = await movies.getfilm(
        `http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
        let review = await sc.scrap(data.Title);
        data["review"] = review
        res.status(200).render("movies", { detail: true, title:true, burger: true, data: data, dataUser:dataUser, notest:notest });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  fav: async (req, res) =>{
    let fav = req.body
    const favInfo = Object.values(fav.like);
    if (fav.fav===true) {
        try {
          console.log("add");
          console.log(favInfo);
          const data = await Users.addFav(favInfo)
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else if (fav.fav===false) {
      try {
        console.log("delete");
        console.log(favInfo);
        const data = await Users.deleteFav(favInfo)
      } catch (err) {
        res.status(400).json({ message: err.message });
    }
    }
  },
  postMovie: (req, res) => {
    const newMovie = req.body
      if (!newMovie.Create) {
        res.status(200).render('admin', {create: true, movies: true})
      } else if (newMovie.Create) {
        data3 = newMovie;
        getMoviesToDB.arrayToDB(newMovie);
      } 
  },
  editMovie: async (req, res) => {
    let title = req.body
      try {
        const data = await Film.findOne({Title:title.Title});
        console.log(data)
        await res.status(200).render('admin', { edit: true, movies: true, data: data });
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
    console.log('**********')
    console.log(data)
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteMovScreen: async (req, res) => {
    const deleteMov = req.body
    res.status(200).render('admin', { remove: true, movies: true, deleteMov: deleteMov })
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
    console.log("Ya estoy aqui!!");
    console.log(req.user);
    if (!req.user.admin) {
      console.log("Busco en sql los ids favoritos");
      // try {
      //   const data = await Film.find({ fav: "true" });
      //   res.status(200).render("movies", { movies: true,headerGen: true, burger: true, data: data });
      // } catch (err) {
      //   res.status(500).json({ message: err.message });
      // }
    } else if (req.user.admin) {
      try {
        const data = await Film.find();
        res.status(200).render("admin", { movies: true, mainScreen: true, data: data, data3: data3 })
        data3 = undefined;
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  },
};

module.exports = routes;