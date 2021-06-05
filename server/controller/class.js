import { getCollection } from '../mongoDb.js'
import "../index.js"
import express from 'express';
import { default as mongodb } from 'mongodb'
import authenticateToken  from '../middleware/auth.js'

const classRouter = express.Router();

// TODO: change the verify token to be a middleware 

// get all classes belongs to a teacher
classRouter.get("/teacher/class", authenticateToken, async (request, response) => {
    try{
        const result = await getCollection('class').find({ teacherEmail: request.user.email}).toArray()
        response.status(200).send(result)
    } catch(error){
        response.status(500).send(error)
    }
})

// get individual class
classRouter.get("/teacher/class/:classId", authenticateToken, async (request, response) => {
    try{
        const uid = request.params.classId
        const result = await getCollection('class').findOne({_id: mongodb.ObjectId(uid)})
        if (request.user.email !== result.teacherEmail) return response.status(403).send("Forbidden")
        response.status(200).send(result)
    } catch(error){
        console.log(error)
        response.status(500).send(error)
    }
})

// Add a class to the database
classRouter.post("/teacher/class", authenticateToken, async (request, response) => {
    try{
        const result = await getCollection('class').insertOne(request.body)
        response.status(200).send(result.ops[0])
    } catch(error){
        return response.status(500).send(error)
    }
});

// Update a class
classRouter.patch("/teacher/class/:classId", async(request, response) => {
    try{
        const uid = request.params.classId
        await getCollection('class').findOneAndReplace({'_id': mongodb.ObjectId(uid)}, request.body)
        response.status(200).send({...request.body, "_id": request.params.classId})
    } catch(error){
        console.log(error)
        return response.status(500).send(error.response)
    }
}) 

// delete a class from the database
classRouter.delete("/teacher/class/:classId", authenticateToken, async (request, response) => {
    try{
        const uid = request.params.classId
        await getCollection('class').findOneAndDelete({'_id': mongodb.ObjectId(uid)})
        response.send(uid)
    } catch(error){

        return response.status(500).send(error.response)
    }
})

export default classRouter