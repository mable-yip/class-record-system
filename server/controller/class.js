import { getCollection } from '../mongoDb.js'
import "../index.js"
import express from 'express';
import { default as mongodb } from 'mongodb'
import authenticateToken  from '../middleware/auth.js'

const classRouter = express.Router();

// get all classes belongs to a teacher
classRouter.get("/teacher/class", authenticateToken, async (request, response) => {
    try{
        const result = await getCollection('class').find({ teacherEmail: request.user.email}).toArray()
        response.status(200).send(result)
    } catch(error){
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
classRouter.patch("/teacher/class/:classId", authenticateToken, async(request, response) => {
    try{
        const classId = request.params.classId
        delete request.body._id
        await getCollection('class').findOneAndUpdate({_id: mongodb.ObjectId(classId), teacherEmail: request.user.email}, {$set: request.body}, {upsert: true})
        response.status(200).send({...request.body, "_id": request.params.classId})
    } catch(error){
        console.log(error)
        return response.status(500).send(error.response)
    }
}) 

// delete a class from the database
classRouter.delete("/teacher/class/:classId", authenticateToken, async (request, response) => {
    try{
        const classId = request.params.classId
        await getCollection('class').findOneAndDelete({_id: mongodb.ObjectId(classId), teacherEmail: request.user.email})
        response.send(classId)
    } catch(error){
        return response.status(500).send(error.response)
    }
})


// Get individual class and its students information
classRouter.get("/teacher/class/:classId", async (request, response) => {
    try{
        const classId = request.params.classId
        const result = await getCollection('class').aggregate([
            { $match: { $and: [{ _id: mongodb.ObjectId(classId) }] }},
            { 
                $lookup: {
                    from: "user",
                    let: { studentsEmail: "$studentsEmail"}, 
                    pipeline: [
                        { 
                            $match: {
                                $expr: { $in: [ "$email", "$$studentsEmail"] }
                            }
                        },
                        { $project : { "password": 0, "_id": 0} }
                    ],
                    as: "studentInfo"
                }
            }, { $project : { "_id": 0, "studentsEmail": 0} }
        ]).toArray()
        response.status(200).send(result[0])
    } catch(error){
        console.log(error)
        response.status(500).send(error)
    }
})

export default classRouter