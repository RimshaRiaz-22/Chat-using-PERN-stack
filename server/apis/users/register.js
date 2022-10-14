const express = require('express')
const pool = require('../../db/conn');
const app = express()

const register = app.post("/register", async (req, res) => {
    try {
        const { email, username, password ,avatarImage,isavatarimageset} = req.body;
        const userData = await pool.query("INSERT INTO userdata(email, username, password,avatarImage,isavatarimageset) VALUES($1,$2,$3,$4,$5) returning *",
            [email, username, password,avatarImage,isavatarimageset])
        const final = userData.rows[0]
        res.json({ status: true, final });
    } catch (error) {
        console.log(error);
    }
    // try {
    //     const { username, email, password } = req.body;
    //     // const usernameCheck = await User.findOne({ username });
    //     // if (usernameCheck)
    //     //   return res.json({ msg: "Username already used", status: false });
    //     // const emailCheck = await User.findOne({ email });
    //     // if (emailCheck)
    //     //   return res.json({ msg: "Email already used", status: false });
    //     // const hashedPassword = await bcrypt.hash(password, 10);
    //     const user = await User.create({
    //       email,
    //       username,
    //       password: hashedPassword,
    //     });
    //     delete user.password;
    //     return res.json({ status: true, user });
    //   } catch (ex) {
    //     next(ex);
    //   }
})

module.exports = register