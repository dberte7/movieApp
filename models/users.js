// const dotenv = require('dotenv');
// const fetch = require('node-fetch');

// dotenv.config();
// // Conexión
// const mariadb = require('mariadb');
// const pool = mariadb.createPool({
//   host: 'db4free.net',
//   user:'adriandez',
//   password:'',
//   connectionLimit: 5,
//   database:"moviapp"
// });

const fetch = require('node-fetch');

// Conexión
const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost',
  user:'root',
  connectionLimit: 5,
  database:"bbdd"
});

// CRUD
const Users = {
       //entry -->[]
    createUser: async (entry) => {
      let result
      let conn;
      try {
        conn = await pool.getConnection();
        
        let sql_query="INSERT INTO `usuarios`( `name`, `email`, `password`) VALUES (?,?,?)"
        result = await conn.query(sql_query,entry);
      } catch (err) {
        console.log("error",err)
        throw err;
      } finally { 
        if (conn) conn.end();
      }
      return result
    },
    addFav: async (favEntry)=>{
      let conn;
      try {
        conn = await pool.getConnection();

        let sql_query="INSERT INTO `favoritos`(`fav_ID`, `omdb`, `user_ID`) VALUES (?,?,?)"
        const res = await conn.query(sql_query,favEntry);
      } catch (err) {
        console.log("error",err)
        throw err;
      } finally {
        if (conn) return conn.end();
      }
    },
    deleteFav: async (favEntry)=>{
      let conn;
      try {
        conn = await pool.getConnection();

        let sql_query="DELETE FROM `favoritos` WHERE favoritos.fav_ID=? AND favoritos.omdb=? AND favoritos.user_ID=?"
        const res = await conn.query(sql_query,favEntry);
      } catch (err) {
        console.log("error",err)
        throw err;
      } finally {
        if (conn) return conn.end();
      }
    },
    existsFav: async (favEntry)=>{
      let exists;
      let conn;
      try {
        conn = await pool.getConnection();
        let sql_query="SELECT `fav_ID` FROM `favoritos` WHERE favoritos.fav_ID=? AND favoritos.user_ID=?" 
        const res = await conn.query(sql_query,favEntry);
        exists = res[0]===undefined? false : true
      } catch (err) {
        console.log("error",err)
        throw err;
      } finally {
        if (conn) conn.end();
      }
      return exists
    },
    allFav: async (userID)=>{
      let allFavs;
      let conn;
      try {
        conn = await pool.getConnection();
        let sql_query="SELECT `fav_ID` FROM `favoritos` WHERE favoritos.user_ID=? AND favoritos.omdb=0" 
        const res = await conn.query(sql_query,userID);
        delete res['meta']
        allFavs = res
        // console.log(res);
        // let data = res.map(obj => obj.fav_ID)
        // console.log(data);
      } catch (err) {
        console.log("error",err)
        throw err;
      } finally {
        if (conn) conn.end();
      }
      return allFavs
    },
    allFavDB: async (userID)=>{
      let allFavsDB;
      let conn;
      try {
        conn = await pool.getConnection();
        let sql_query="SELECT `fav_ID` FROM `favoritos` WHERE favoritos.user_ID=? AND favoritos.omdb=1" 
        const res = await conn.query(sql_query,userID);
        delete res['meta']
        allFavsDB = res
      } catch (err) {
        console.log("error",err)
        throw err;
      } finally {
        if (conn) conn.end();
      }
      return allFavsDB
    }
}


module.exports = Users;



//INSERT INTO `favoritos`(`ID`, `fav_ID`, `omdb`, `user_ID`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]')