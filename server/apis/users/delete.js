const express = require('express')
const pool = require('../../db/conn');
const app = express()

const register =app.delete("/deleteUser", async (req, res) => {
    try {
        const {id}=req.body;
        console.log(id)
        let data={}
        const userData=await pool.query("DELETE from userdata WHERE id=$1 returning *",
        [id]);
        data=userData.rows[0];
       
        res.json(data)
      } catch (error) {
          res.status(500).json(error);
      }
        
})

module.exports = register