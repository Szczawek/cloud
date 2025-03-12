import mysql2 from "mysql2"

const db = mysql2.createConnection({
    host:"127.0.0.1",
    user:"user",
    password:"9goFK18O7XNFZI",
    database:"kick",
})

export {db};
