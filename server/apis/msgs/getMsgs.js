const express = require('express')
const pool = require('../../db/conn');
const app = express()

const msgs = app.post("/getmsg", async (req, res) => {
    
    try {
        const { fromuser, touser } = req.body;
        const usersData = await pool.query("SELECT * FROM msg WHERE (touser=$1 AND fromuser=$2) OR (fromuser=$1 AND touser=$2)" ,
        [touser,fromuser]);
        res.json(usersData.rows);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = msgs