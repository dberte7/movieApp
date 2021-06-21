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
      console.log(entry)
      let result
      let conn;
      try {
        conn = await pool.getConnection();
        
        let sql_query="INSERT INTO `usuarios`( `name`, `email`, `password`) VALUES (?,?,?)"
        result = await conn.query(sql_query,entry);
        console.log("searchEntries",result); 
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
        console.log("addFav",res); 

      } catch (err) {
        console.log("error",err)
        throw err;
      } finally {
        if (conn) return conn.end();
      }
    },
    deleteFav: async (favEntry)=>{
      console.log("hola");
      let conn;
      try {
        conn = await pool.getConnection();

        let sql_query="DELETE FROM `favoritos` WHERE favoritos.fav_ID=? AND favoritos.omdb=? AND favoritos.user_ID=?"
        const res = await conn.query(sql_query,favEntry);
        console.log("deleteFav",res); 

      } catch (err) {
        console.log("error",err)
        throw err;
      } finally {
        if (conn) return conn.end();
      }
    }
}



module.exports = Users;



//INSERT INTO `favoritos`(`ID`, `fav_ID`, `omdb`, `user_ID`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]')