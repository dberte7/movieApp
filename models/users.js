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
      console.log("funcionando")
      let conn;
      try {
        conn = await pool.getConnection();

        let sql_query="INSERT INTO `favoritos`(`fav_ID`, `omdb`, `user_ID`) VALUES (?,?,?)"
        const res = await conn.query(aql_query,favEntry);
        console.log("searchEntries",res); 

        let getEmail = email
        let getPassword = password
        console.log("******");
        console.log(getEmail);
        console.log(getPassword);
        console.log("******");

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