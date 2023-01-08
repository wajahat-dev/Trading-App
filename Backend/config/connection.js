const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "rootUser",
    database: "postgres"
})

// sequelize.authenticate().then(function(err) {
//     if (!!err) {
//         console.log('Unable to connect to the database:', err)
//     } else {
//         console.log('Connection has been established successfully.')
//     }
// });

module.exports = client