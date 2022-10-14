const express = require('express')
const pool = require('../../db/conn');
const app = express()

const register =app.post("/login", async (req, res) => {
    try {
        const { email, password} = req.body;
        const userData = await pool.query("SELECT * FROM userdata WHERE email=$1 AND password=$2",
         [email,password]);
        const final= userData.rows[0];
       
console.log()
        res.json({ status: true,final});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);

    }
        
})

module.exports = register