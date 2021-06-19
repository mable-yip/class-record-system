import { getCollection } from '../mongoDb.js'
import "../index.js"
import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import authenticateToken  from '../middleware/auth.js'
import ApiError from '../error/ApiError.js'

const usersRouter = express.Router();

/**
 * Handles a POST request, which will compare the bcryted password
 */
usersRouter.post("/login", async (request, response, next) => {
    console.log("login called")
    const user = await getCollection('user').findOne({ email: request.body.email})
    if (user == null) return next(ApiError.badRequest("Wrong username/password!"))

    if (await bcrypt.compare(request.body.password, user.password)){ // Authenication pass 
        delete user.password
        console.log(user)
        const token = jwt.sign(user, "jwtSecret")
        // , {
        //     expiresIn: 500
        // })  
        response.status(200).send(token);
    } else{
        return next(ApiError.badRequest("Wrong username/password!"))
    }
});


usersRouter.get("/users/:email", authenticateToken, async (req, res)=>{
    const user = await getCollection('user').findOne({ email: req.params.email})
    if (user == null) return next(ApiError.badRequest("cannot find user"))
    res.status(200).send(user)
})

/**
 * Handles a POST request to create a user
 */
usersRouter.post("/admin/users", authenticateToken, async (request, response, next) => {

    const existingUser = await getCollection('user').findOne({ email: request.body.email})
    if(existingUser) return next(ApiError.badRequest("User already exist"))

    try{
        const salt =  await bcrypt.genSalt()
        const hashedPassword =  await bcrypt.hash(request.body.password, salt)
        const result = await getCollection('user').insertOne({...request.body, password: hashedPassword})
        response.status(200).send(result.ops[0])

    } catch(error){
        response.status(500).send(error)
    }
})


/**
 * Handles a DELETE request to delete a user
 */
usersRouter.delete("/admin/users/:email", authenticateToken, async (request, response) => {
    try {
        const user = await getCollection('user').findOne({ email: request.params.email})
        await getCollection('user').deleteOne({ "email" : request.params.email })
        response.status(200).send(user)
     } catch (error) {
        response.status(500).send(error);
     }
})

/**
 * Handle a GET request to get all the teachers in the database 
 */
usersRouter.get("/admin/all-teachers", authenticateToken, async (request, response) => {
    try{
        const result = await getCollection('user').find({ userType: "teacher"}, { password: 0}).toArray()
        response.status(200).send(result)
    } catch(error){
        response.status(500).send(error);
    }
})

/**
 * Handle a GET request to get all the students in the database 
 */
usersRouter.get("/admin/all-students", authenticateToken, async (request, response) => {
    try{
        const results = await getCollection('user').find({ userType: "student"}).project({ password: 0}).toArray()
        response.status(200).send(results)
    } catch(error){
        response.status(500).send(error)
    }
})

export default usersRouter