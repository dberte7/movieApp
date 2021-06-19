// Conexión
const mariadb = require('mariadb');
const pool = mariadb.createPool({
 host: 'localhost',
 user:'root',
 connectionLimit: 5,
 database:"bbdd"});

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
    
    
       
    }
}
module.exports = Users;


