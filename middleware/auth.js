require('dotenv').config();

const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const mariadb = require('mariadb');
const mySecret = process.env.SECRET


const pool = mariadb.createPool({
    host: 'localhost',
    user:'root',
    connectionLimit: 5,
    database:"bbdd"
});


const checkAuth = async (req, res, next) =>{

    let email = req.body.email
    let password = req.body.password
    let bool;
    
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query("SELECT * FROM usuarios  WHERE usuarios.email=?",[email]);
        const isMatch = await bcrypt.compare(password, response[0].password)

        const str = JSON.stringify(response[0].admin)
        str[25]==="0"? bool = false : bool = true


        req.body = {
            email: response[0].email,
            admin: bool
        }

        if (email=response[0].admin&&isMatch) {
            const payload = {
                id:response[0].user_ID,
                name:response[0].name,
                admin:bool
            }
            const token= JWT.sign(payload,mySecret)
            res.cookie('acces_token',token)
            next()
        } else {
            res.send("Log in failed, please try again")
        }
        
    } catch (err) {
        console.log("error",err)
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

module.exports = checkAuth

 // console.log('query');
    // console.log(req.query.email);
    // console.log(req.query.password);


    // console.log('body');
    // console.log(req.body);

    //
    // logged.user = consula la bbdd y dame el email del usuario para comparar
    // logged.password = consula la bbdd y dame el password del usuario para comparar
        
    
    // if (email){

    //         if(passwordBBDD===password){
    //             console.log("generar token");
    //         } else {
    //             res.send("contraseña incorrecta");
    //         }
    
    //     } else {
    //         res.send("contraseña incorrecta");
    //     }
    
    //console.log("Authenticate if identity is confirmed next");

    //console.log(`User:${logged.user} is logged in`);
    
    //logged.user ? next() : res.send("Please Log In")
// }