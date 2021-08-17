const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const { verify_mobile_number, verify_email, accesstokengenerator, validate_email, validate_mobile_number, validate_password } = require('./middlewares')
const bcrypt = require('bcrypt')
const UserModel = require('./models/user')
const jwt = require('jsonwebtoken')

app.use(
    cors({
        origin: 'http://localhost:3000' || process.env.PORT
    })
)

const { MONGODB_URL, SECRET_KEY } = process.env
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}, async (err) => {
    if (err) throw err
    console.log("connected")
})

app.post("/signup", async (req, res) => {
    const verifyemail = await verify_email(req.body.Email)
    if (verifyemail != true) {
        return res.json({
            error: verifyemail
        })
    }

    const verifymobilenumber = await verify_mobile_number(req.body.Mobilenumber)

    if (verifymobilenumber != true) {
        return res.json({
            error: verifymobilenumber
        })
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.Password, salt)
        req.body.Password = hash
        const newuser = new UserModel(req.body)
        const finaluser = await newuser.save()
        const token = accesstokengenerator(finaluser._id)
        return res.json({ error: "", token })

    } catch (error) {
        console.log(error)
        return res.json({ error: "Inputs provided are not valid" })
    }
})

app.post("/getprofile", async (req, res) => {
    try {
        const token = req.headers.auth
        if (!token) return { error: true }
        const verifieduser = jwt.verify(token, SECRET_KEY)
        let user = await UserModel.findById(verifieduser.id)
        const { Name, Mobilenumber, Email } = user
        return res.json({ Name, Mobilenumber, Email, error: "" })
    } catch {
        console.log("Error occurred")
        return res.json({ error: "User has not loggin in" })
    }
})

app.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({ Email: req.body.Email })
        const isMatching = await bcrypt.compare(req.body.Password, user.Password)
        if (user != null && isMatching) {
            const token = accesstokengenerator(user._id)
            return res.json({ error: "", token })
        }

    } catch (error) {
        return res.json({ error: "No such user found" })
    }

    return res.json({ error: "Password provided was not correct" })
})

app.post("/editprofile", async (req, res) => {
    try {
        const token = req.headers.auth
        if (!token) return { error: "Please provide a valid token" }
        const verifieduser = jwt.verify(token, SECRET_KEY)

        if (Object.keys(req.body).length !== 5 || req.body.Pasword === undefined || req.body.NewPassword === undefined) {
            return res.json({ error: "Inputs provided are not of valid format" })
        }

        if (req.body.Name === undefined || req.body.Name.length === 0) return res.json({ errror: "Name is not valid" })

        const email = await validate_email(req.body.Email, verifieduser.id)
        const mobilenumber = await validate_email(req.body.Mobilenumber, verifieduser.id)

        if (verifieduser.id !== email) {
            return res.json({ error: "Another user with this email exists" })
        }

        if (verifieduser.id !== mobilenumber) {
            return res.json({ error: "Another user with this mobile number exists" })
        }

        let editeduser = {}
        if (req.body.Password !== "" && req.body.NewPassword !== "" && typeof req.body.NewPassword === "string") {
            const oldpassword = await validate_password(req.body.Password, verifieduser.id)
            if (oldpassword === true) {
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(req.body.Password, salt)
                editeduser.Password = hash
            }
        }
        delete req.body.NewPassword
        delete req.body.Password
        editeduser = [...editeduser, ...req.body]
        updateduser = await UserModel.updateOne({ _id:verifieduser.id}, {$set:editeduser})

    } catch (error) {
        return res.json({ error: "Error occurred at backend" })
    }
})

app.listen(5000)
