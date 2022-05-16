const mysql = require('mysql2');
const dbconfig = require('./dbconfig')

const connection = mysql.createConnection(dbconfig);

// connection.connect();
//
// connection.query('SELECT * FROM user', (err, rows, field) => {
//     if(err)
//         throw err;
//     console.log('user info is', rows);
// });
//
// connection.end();

const config = {

}

