const express = require('express')
const pool = require('../../db/conn');
const app = express()

const register =app.put("/setAvatar", async (req, res) => {
    try {
        // const { id } = req.params;
        const { image,id } = req.body;
        let data = {};
        const userData = await pool.query(`UPDATE userdata set avatarImage=$1 ,isAvatarImageSet=true WHERE id=$2 returning *`,
         [image ,id]);
        data = userData.rows[0];
        // res.json(data);
        res.json({
            isSet: data.isAvatarImageSet,
            image: data.avatarImage,
          });
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = register