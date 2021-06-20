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
    searchEntries: async (email, password)=>{
      console.log("funcionando")
      let conn;
      try {
        conn = await pool.getConnection();
        const res = await conn.query("SELECT * FROM usuarios  WHERE usuarios.email=?",[email]);
        console.log("searchEntries",res); 

        let getEmail = email
        let getPassword = password
        console.log("******");
        console.log(getEmail);
        console.log(getPassword);
        console.log("******");

      //   let infoVal = {
      //     email: res[0].email,
      //     password: res[0].password
      //   }
      
      // let options = {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json"
      //         },
      //     body: JSON.stringify(infoVal)
      // }
  
      // let response = await fetch("http://localhost:3000/signIn", options)
      // let data = await response.json()
      // return data;
        
      } catch (err) {
        console.log("error",err)
        throw err;
      } finally {
        if (conn) return conn.end();
      }
    }
}



module.exports = Users;



