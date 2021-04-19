// const express = require("express");
// const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectID;
// const cors = require("cors")
// const jwt = require("jsonwebtoken")
import userRouter from "./routes/user.js";

import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { default as mongodb } from 'mongodb'

let MongoClient = mongodb.MongoClient
const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/testRoute', (req, res) => res.send('Hello from Server!'))
app.use("/user", userRouter);


let database, userDb;

const CONNECTION_URL = 'mongodb+srv://hoypqn4:amLP5483@cluster0.6iqab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const DATABASE_NAME = "class-record-system"
const PORT = 5000

app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        userDb = database.collection("user");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});


app.get("/user/:email", async (req, res)=>{
    const user = await userDb.findOne({ email: req.params.email})
    if (user == null){
        res.status(400).send("Cannot find user")
    } else{
        res.status(200).send(user)
    }
})

app.post("/admin/user", authenticateToken, async (request, response) => {
    const existingUser = await userDb.findOne({ email: request.body.email})

    if(existingUser) return response.status(400).send({message: "User already exist"})

    const salt =  await bcrypt.genSalt()
    const hashedPassword =  await bcrypt.hash(request.body.password, salt)

    userDb.insert({...request.body, password: hashedPassword}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.status(200).send({message: "User had been created successfully"});// should have problem here
    });
});


app.delete("/admin/user/:email", authenticateToken, async (request, response) => {
    try {
        await userDb.deleteOne({ "email" : request.params.email })
        response.status(200).send("success")
     } catch (e) {
        console.log(e)
        response.status(400)//check code 
     }
})


app.post("/login", async (request, response) => {
    const user = await userDb.findOne({ email: request.body.email})
    
    if (user == null) return response.status(400).send("Cannot find user")

    try {
        if (await bcrypt.compare(request.body.password, user.password)){ // Authenication pass 
            const token = jwt.sign(user, "jwtSecret")
            // , {
            //     expiresIn: 500
            // })  
            response.status(200).send({auth: true, accessToken: token, userType: user.userType, email: user.email});
        } else{
            response.status(401).send({auth: false, message: "Wrong username/password"});
        }
    } catch (error){
        response.status(400).send(error.message)
    }
});

app.get("/admin/allTeachers", authenticateToken, async (request, response) => {
    await userDb.find({ userType: "teacher"}).toArray(function(error, documents) {
        if (error) throw error;
        response.send(documents);
    });
})

app.get("/admin/allStudents", authenticateToken, async (request, response) => {
    await userDb.find({ userType: "student"}).toArray(function(error, documents) {
        if (error) throw error;
        response.send(documents);
    });
})


app.get("/teacher/:email", authenticateToken, async (request, response) => {
    await userDb.update({ "email" : request.params.email },
    {$set: { "EmployeeName" : "NewMartin"}})
})



function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, "jwtSecret", (err, user) => {

        if (err) return res.sendStatus(403) // token is no longer valid
        req.user =  user
        next()
    })
}