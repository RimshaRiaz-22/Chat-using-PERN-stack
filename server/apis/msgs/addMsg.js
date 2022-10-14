const express = require('express')
const pool = require('../../db/conn');
const app = express()

const msgs = app.post("/addmsg", async (req, res) => {
    // try {
    //     const { from, to, message } = req.body;
    //     const data = await Messages.create({
    //       message: { text: message },
    //       users: [from, to],
    //       sender: from,
    //     });
    
    //     if (data) return res.json({ msg: "Message added successfully." });
    //     else return res.json({ msg: "Failed to add message to the database" });
    //   } catch (ex) {
    //     next(ex);
    //   }

    try {
        const { fromuser, touser, messages } = req.body;
        const userData = await pool.query("INSERT INTO msg(fromuser, touser, messages) VALUES($1,$2,$3) returning *",
            [fromuser, touser, messages])
        const final = userData.rows[0]
        res.json({ status: true, final });
    } catch (error) {
        console.log(error);
    }
})

module.exports = msgs