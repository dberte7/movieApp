const Film = require('../models/Film');
const movies = require('../utils/movies');
const getMoviesToDB = require('../utils/getMoviesToDB');
const apikey = process.env.API_KEY

const routes = {
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
                    if (false){
                        res.status(500).json({ message: `${data.Error}`});
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
                
            }
        })
        
    },
    searchTitle: async (req, res) => {
        let titleQ = req.params.title;
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
                        let data = await movies.getfilm(`http://www.omdbapi.com/?t=${titleQ}&apikey=${apikey}&`);
                        getMoviesToDB.arrayToDB(data, titleQ)
                        res.status(200).json(data);
                    } catch (err) {
                        res.status(500).json({ message: err.message });
                    }
                }
                
            }
        })
    }
}

module.exports = routes;