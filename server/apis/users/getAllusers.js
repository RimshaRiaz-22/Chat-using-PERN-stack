const express = require('express')
const pool = require('../../db/conn');
const app = express()

const register = app.get("/getAll", async (req, res) => {
    try {
        const usersData = await pool.query("SELECT * FROM userdata");
        res.json(usersData.rows);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = register