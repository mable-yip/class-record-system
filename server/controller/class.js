import { getCollection } from '../mongoDb.js'
import "../index.js"
import express from 'express';
import { default as mongodb } from 'mongodb'

const classRouter = express.Router();


// get all classes belongs to a teacher
classRouter.get("/teacher/class/:email", async (request, response) => {
    try{
        const result = await getCollection('class').find({ teacherEmail: request.params.email}).toArray()
        response.status(200).send(result)
    } catch(error){
        response.status(500).send(error)
    }
})

// Add a class to the database 
classRouter.post("/teacher/class", async (request, response) => {
    try{
        const result = await getCollection('class').insertOne(request.body)
        response.status(200).send(result.ops[0])
    } catch(error){
        return response.status(500).send(error)
    }
});

// delete a class from the database
classRouter.delete("/teacher/class/:classId", async (request, response) => {
    try{
        const uid = request.params.classId
        await getCollection('class').findOneAndDelete({'_id': mongodb.ObjectId(uid)})
        response.send(uid)
    } catch(error){
        return response.status(500).send(error)
    }
})

export default classRouter