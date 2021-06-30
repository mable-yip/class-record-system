import { getCollection } from '../mongoDb.js'
import "../index.js"
import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import authenticateToken  from '../middleware/auth.js'

const usersRouter = express.Router();

/**
 * Handles a POST request, which will compare the bcryted password
 */
usersRouter.post("/login", async (request, response, next) => {
    console.log("login called")
    const user = await getCollection('user').findOne({ email: request.body.email})
    if (!user){
        next({
            code: 400,
            msg: "Wrong username/password!"
        })
        return 
    }

    if (await bcrypt.compare(request.body.password, user.password)){ // Authenication pass 
        delete user.password
        console.log(user)
        const token = jwt.sign(user, "jwtSecret")
        // , {
        //     expiresIn: 500
        // })  
        response.status(200).send(token);
    } 
    next({
        code: 400,
        msg: "Wrong username/password!"
    })
});


usersRouter.get("/users/:email", authenticateToken, async (req, res)=>{
    const user = await getCollection('user').findOne({ email: req.params.email})
    if (!user){
        next({
            code: 400,
            msg: "cannot not find user" 
        })
        return
    }
    res.status(200).send(user)
})

/**
 * Handles a POST request to create a user
 */
usersRouter.post("/admin/users", authenticateToken, async (request, response, next) => {
    const existingUser = await getCollection('user').findOne({ email: request.body.email})
    if(existingUser){
        next({
            code: 400,
            msg: "User already exist"
        })
        return 
    }
    const salt =  await bcrypt.genSalt()
    const hashedPassword =  await bcrypt.hash(request.body.password, salt)
    const result = await getCollection('user').insertOne({...request.body, password: hashedPassword})
    response.status(200).send(result.ops[0])
})


/**
 * Handles a DELETE request to delete a user
 */
usersRouter.delete("/admin/users/:email", authenticateToken, async (request, response) => {
    const user = await getCollection('user').findOne({ email: request.params.email})
    await getCollection('user').deleteOne({ "email" : request.params.email })
    response.status(200).send(user)
})

/**
 * Handle a GET request to get all the teachers in the database 
 */
usersRouter.get("/admin/all-teachers", authenticateToken, async (request, response) => {
    const result = await getCollection('user').find({ userType: "teacher"}, { password: 0}).toArray()
    response.status(200).send(result)
})

/**
 * Handle a GET request to get all the students in the database 
 */
usersRouter.get("/admin/all-students", authenticateToken, async (request, response) => {
    const results = await getCollection('user').find({ userType: "student"}).project({ password: 0}).toArray()
    response.status(200).send(results)
})

export default usersRouter