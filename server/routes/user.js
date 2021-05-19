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
usersRouter.post("/login", async (request, response) => {
    const user = await getCollection('user').findOne({ email: request.body.email})
    console.log(user)
    if (user == null) return response.status(400).send({status: "Fail", message: "Cannot find user", data: null})

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


usersRouter.get("/user/:email", async (req, res)=>{
    const user = await getCollection('user').findOne({ email: req.params.email})
    if (user === null){
        res.status(400).send("Cannot find user!")
    } else{
        res.status(200).send(user)
    }
})

/**
 * Handles a POST request to create a user
 */
usersRouter.post("/admin/user", authenticateToken, async (request, response) => {
    const existingUser = await getCollection('user').findOne({ email: request.body.email})
    if(existingUser) return response.status(400).send({message: "User already exist"})

    const salt =  await bcrypt.genSalt()
    const hashedPassword =  await bcrypt.hash(request.body.password, salt)

    getCollection('user').insertOne({...request.body, password: hashedPassword}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.status(200).send({message: "User had been created successfully"});// should have problem here
    });
});


/**
 * Handles a DELETE request to delete a user
 */
usersRouter.delete("/admin/user/:email", async (request, response) => {
    try {
        // update teacher if studentList of the teacher contains the student to be deleted
        await getCollection('user').updateMany(
            { studentList: {$in:[request.params.email]}},
            {$pull: { "studentList" : request.params.email}})

        await getCollection('user').deleteOne({ "email" : request.params.email })
        response.status(200).send({message: "User had been deleted successfully"})
     } catch (e) {
        response.status(400)//check code 
     }
})

/**
 * Handle a GET request to get all the teachers in the database 
 */
usersRouter.get("/admin/allTeachers", authenticateToken, async (request, response) => {
    await getCollection('user').find({ userType: "teacher"}).toArray(function(error, documents) {
        if (error) throw error;
        response.send(documents);
    });
})

/**
 * Handle a GET request to get all the students in the database 
 */
usersRouter.get("/admin/allStudents", authenticateToken, async (request, response) => {
    await getCollection('user').find({ userType: "student"}).toArray(function(error, documents) {
        if (error) throw error;
        response.send(documents);
    });
})

export default usersRouter

