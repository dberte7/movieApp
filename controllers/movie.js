const Film = require('../models/Film');
const movies = require('../utils/movies');
const getMoviesToDB = require('../utils/getMoviesToDB');
const apikey = process.env.API_KEY;
//Variable user temporal
let user = true;

const routes = {
    signIn:(req, res) => {
        res.status(200).render('movies', {signIn: true})
    },
    dashboard:(req, res) => {
        res.status(200).render('movies', {dashboard: true})
    },
    getMovies: async (req, res)=>{
        let titleQ = req.query.s
        let search = [];
        if (titleQ === undefined) {
            res.status(200).render('movies', {searchPage: true})
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
                        //getMoviesToDB.arrayToDB(data2, titleQ);
                    }
                }
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
            res.status(200).render('movies', {searchPage: true, search:search})
        }    
    },
    searchTitle: async(req, res) => {
        
let titleQ = req.params.title
let search = [];
Film.exists({ title: titleQ}, async (err,result)=>{
    if(err){
        console.log(error);
    } else {
        if(result){
            try {
                const data = await Film.find({ title:titleQ});
                console.log("base de datos");
                res.status(200).render('movies', {detail: true, data:data});
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
                res.status(200).render('movies', {detail: true, search:search})
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
        if (user) {
            try {
                const data = await Film.find({fav:"true"})
                //res.status(200).json(data);
                res.status(200).render('movies', {movies: true, data:data})
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        } else if (admin) {
            try {
                const data = await Film.find();
                //res.status(200).json(data);
                res.status(200).render('movies', {movies: true, data:data})
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        }  
    }
}
module.exports = routes;

