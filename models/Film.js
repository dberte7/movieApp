const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique:true
        },
    image: {
        type: String,
        validate: {
            validator: text => {
                return text.indexOf('https://') === 0;
            },
        required: true,
        default: "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-1-696x1024.jpg"
        }
        },
    year: {
        type: String,
        required: true,
        },
    director: {
        type: String,
        required: true
        },
    genre: {
        type: String,
        required: true
        },
    runtime: {
        type: String,
        required: true
        },
    storyLine: {
        type: String
        },
    actors: {
        type: String
        },
    imdbRating: {
        type: String
        },
    reviews: {
        type: String
        },
    fav: {
        type: Boolean,
        default: false
        },
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
        }
});

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;

//search result http://www.omdbapi.com/?s=batman&apikey=dd16e7a6&
// {
//     "Search": [
//     {
//     "Title": "Batman Begins",
//     "Year": "2005",
//     "imdbID": "tt0372784",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
//     },
//     {
//     "Title": "Batman v Superman: Dawn of Justice",
//     "Year": "2016",
//     "imdbID": "tt2975590",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
//     },
//     {
//     "Title": "Batman",
//     "Year": "1989",
//     "imdbID": "tt0096895",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"
//     },
//     {
//     "Title": "Batman Returns",
//     "Year": "1992",
//     "imdbID": "tt0103776",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"
//     },
//     {
//     "Title": "Batman Forever",
//     "Year": "1995",
//     "imdbID": "tt0112462",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
//     },
//     {
//     "Title": "Batman & Robin",
//     "Year": "1997",
//     "imdbID": "tt0118688",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
//     },
//     {
//     "Title": "The Lego Batman Movie",
//     "Year": "2017",
//     "imdbID": "tt4116284",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg"
//     },
//     {
//     "Title": "Batman: The Animated Series",
//     "Year": "1992–1995",
//     "imdbID": "tt0103359",
//     "Type": "series",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"
//     },
//     {
//     "Title": "Batman: Under the Red Hood",
//     "Year": "2010",
//     "imdbID": "tt1569923",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
//     },
//     {
//     "Title": "Batman: The Dark Knight Returns, Part 1",
//     "Year": "2012",
//     "imdbID": "tt2313197",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg"
//     }
//     ],
//     "totalResults": "437",
//     "Response": "True"
//     }

// seachTitle result http://www.omdbapi.com/?t=batman&apikey=dd16e7a6&
// {
//     "Title": "Batman",
//     "Year": "1989",
//     "Rated": "PG-13",
//     "Released": "23 Jun 1989",
//     "Runtime": "126 min",
//     "Genre": "Action, Adventure",
//     "Director": "Tim Burton",
//     "Writer": "Bob Kane (Batman characters), Sam Hamm (story), Sam Hamm (screenplay), Warren Skaaren (screenplay)",
//     "Actors": "Michael Keaton, Jack Nicholson, Kim Basinger, Robert Wuhl",
//     "Plot": "The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.",
//     "Language": "English, French, Spanish",
//     "Country": "USA, UK",
//     "Awards": "Won 1 Oscar. Another 8 wins & 26 nominations.",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg",
//     "Ratings": [
//       {
//     "Source": "Internet Movie Database",
//     "Value": "7.5/10"
//     },
//       {
//     "Source": "Rotten Tomatoes",
//     "Value": "71%"
//     },
//       {
//     "Source": "Metacritic",
//     "Value": "69/100"
//     }
//     ],
//     "Metascore": "69",
//     "imdbRating": "7.5",
//     "imdbVotes": "343,300",
//     "imdbID": "tt0096895",
//     "Type": "movie",
//     "DVD": "24 Jul 2014",
//     "BoxOffice": "$251,348,343",
//     "Production": "Warner Brothers, Guber-Peters Company, PolyGram Filmed Entertainment",
//     "Website": "N/A",
//     "Response": "True"
//     }