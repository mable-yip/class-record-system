import { getCollection } from '../mongoDb.js'
import "../index.js"
import express from 'express';
import { default as mongodb } from 'mongodb'
import authenticateToken  from '../middleware/auth.js'

const classRouter = express.Router();

// get all classes belongs to a teacher
classRouter.get("/teacher/classes", authenticateToken, async (request, response) => {
    try{
        const result = await getCollection('class').find({ teacherEmail: request.user.email}).toArray()
        response.status(200).send(result)
    } catch(error){
        response.status(500).send(error)
    }
})

// Add a class to the database
classRouter.post("/teacher/classes", authenticateToken, async (request, response) => {
    try{
        const result = await getCollection('class').insertOne(request.body)
        response.status(200).send(result.ops[0])
    } catch(error){
        return response.status(500).send(error)
    }
});

// Update a class
classRouter.patch("/teacher/classes/:classId", authenticateToken, async(request, response) => {
    try{
        const classId = request.params.classId
        const updatedFields = request.body
        const addedStudent = updatedFields.addedStudentEmail?updatedFields.addedStudentEmail:[]
        const deletedStudent = updatedFields.deletedStudentEmail?updatedFields.deletedStudentEmail:[]

        const { addedStudentEmail, deletedStudentEmail, ...otherFields } = updatedFields

        console.log(otherFields)



        await getCollection('class').update({_id: mongodb.ObjectId(classId)}, {$push: {studentsEmail: { $each: addedStudent}}})
        await getCollection('class').update({_id: mongodb.ObjectId(classId)}, {$pull: {studentsEmail: {$in: deletedStudent}}})

        const updatedDoc = await getCollection('class').findOneAndUpdate({_id: mongodb.ObjectId(classId), teacherEmail: request.user.email}, {$set: otherFields}, {returnOriginal: false})
        console.log("updated!!", updatedDoc.value)
        response.status(200).send(updatedDoc.value)
    } catch(error){
        console.log(error)
        return response.status(500).send(error)
    }
}) 

// delete a class from the database
classRouter.delete("/teacher/classes/:classId", authenticateToken, async (request, response) => {
    try{
        const classId = request.params.classId
        await getCollection('class').findOneAndDelete({_id: mongodb.ObjectId(classId), teacherEmail: request.user.email})
        response.send(classId)
    } catch(error){
        return response.status(500).send(error.response)
    }
})


// Get individual class and its students information
classRouter.get("/teacher/classes/:classId", async (request, response) => {
    try{
        const classId = request.params.classId
        const result = await getCollection('class').aggregate([
            { $match: { _id: mongodb.ObjectId(classId)}},
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