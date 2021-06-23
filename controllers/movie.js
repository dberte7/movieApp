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
        const decrypt = JWT.verify(token, mySecret);
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
          let passTitleQ = titleQ
          if (!result){
            search = []  
            let data = await movies.getfilm(`http://www.omdbapi.com/?s=${titleQ}&type=movie&apikey=${apikey}&`);
            for (let index = 0; index < data.Search.length; index++) {
              let id = data.Search[index].imdbID;
              let data2 = await movies.getfilm(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
              if(data2.Poster==="N/A") data2.Poster = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-1-300x450.jpg"
              search.push(data2);
            }
              res.status(200).render("movies", { searchPage: true, title:true, burger: true, search: search, passTitleQ:passTitleQ });
          } else {
            const dataDb = Film.findOne({Title:titleQ}).lean().exec(async (err, movie) => {
              let mov_ID = "D" + movie.movieId.toString()
              let dbSearch = {
                              Title: movie.Title,
                              Year: movie.Year,
                              Runtime: movie.Runtime,
                              Genre: movie.Genre,
                              Director: movie.Director,
                              Poster: movie.Poster,
                              imdbID: mov_ID
                            }
              res.status(200).render("movies", { searchPage: true, title:true, burger: true, dbSearch: dbSearch, passTitleQ:passTitleQ });
            })
          }
        }
      })
    }
  },
  searchTitle: async (req, res) => {
    let split = JSON.stringify(req.params)
    let keySearch = split.split("=")
    let key = keySearch[1].replace(/^"|}|"$/g, '')
    let searchKey = key.replace(/^"|"$/g, '')
    let omdb;
    const str = JSON.stringify(req.params.title)
    str[1]==="D"? omdb = true : omdb = false
    let userID = req.user.id
    let dataUser = {user_ID:userID}
    let dataD;
    let exists;
    let checked;
    if (omdb) {
      let split = str.split("D")
      let split2 = split[1].split("&")
      let replace = split2[0].replace(/^"|"$/g, '')
      let mov_ID = Number(replace)
      exists = await Users.existsFav([mov_ID,userID])
      checked = exists===true? true : false
      try{
        const data = await Film.findOne({movieId:mov_ID});
        dataD = data
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
      res.status(200).render("movies", { detail: true, title:true, burger: true, dataD: dataD, dataUser:dataUser, searchKey:searchKey, checked:checked})
    } else {
      let str2 = req.params.title
      let split3 = str2.split("&")
      let id = split3[0]
      exists = await Users.existsFav([id,userID])
      checked = exists===true? true : false
      try{
        let data = await movies.getfilm(
          `http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
          //let review = await sc.scrap(data.Title);
          //data["review"] = review
          res.status(200).render("movies", { detail: true, title:true, burger: true, data: data, dataUser:dataUser, searchKey:searchKey, checked:checked});
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  },
  fav: async (req, res) =>{
    let fav = req.body
    const favInfo = Object.values(fav.like);
    if (fav.fav===true) {
        try {
          const data = await Users.addFav(favInfo)
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else if (fav.fav===false) {
      try {
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
        await res.status(200).render('admin', { edit: true, data: data });
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
    if (!req.user.admin) {
      let userID = req.user.id
    let dataUser = {user_ID:userID}
      let dataFav =[] ;
      let fav = await Users.allFav(req.user.id)
      let fav2 = await Users.allFavDB(req.user.id)
      for (let index = 0; index < fav.length; index++) {
        let id = fav[index].fav_ID;
        let data = await movies.getfilm(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}&`);
        dataFav.push(data)
      }
      for (let index = 0; index < fav2.length; index++) {
        let mov_ID = fav2[index].fav_ID;
        let data2 = await Film.find({movieId:mov_ID});
        dataFav.push(data2[0]);
      }
      res.status(200).render("movies", { movies: true, title: true, burger: true, dataUser:dataUser, dataFav:dataFav });
      dataFav=[];
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

      // try {
      //   const data = await Film.find({ fav: "true" });
      //   res.status(200).render("movies", { movies: true,headerGen: true, burger: true, data: data });
      // } catch (err) {
      //   res.status(500).json({ message: err.message });
      // }