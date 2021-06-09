// require express 
const express = require("express");

//require .env
dotenv = require('dotenv').config();

// require rutas
const router = require('./routes/movie')
console.log("iufifaijd")
// declaracion de express
const app = express();

// motor de vistas 
app.set("view engine", "pug");
app.set("views", "./views");

// uses para JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// para añadir acceso a ficheros en carpeta public
app.use("/public", express.static("public"));

// para asignar rutas principales
app.use("/", router);

// error 404 y 500
app.use((req, res, next) =>{
    console.log("error404");
    return res.status(404).json({message: "Route does not exist"})
});
app.use((err, req, res, next) =>{
    console.log("error500");
    return res.status(500).json({message: `Server ${err}`})
});

// inicializacion del servidor 
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});