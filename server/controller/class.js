import { getCollection } from '../mongoDb.js'
import "../index.js"
import express from 'express';

const classRouter = express.Router();


// get all classes belongs to a teacher
classRouter.get("/teacher/class/:email", async (request, response) => {
    await getCollection('class').find({ teacherEmail: request.params.email}).toArray(function(error, documents) {
        if (error) throw error;
        response.send(documents);
    });
})

// Add a class to the database 
classRouter.post("/teacher/class", async (request, response) => {
    getCollection('class').insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.status(200).send(result);
    });
});

// delete a class from the database
classRouter.delete("/teacher/class/:classId", async (request, response) => {
    var uid = request.params.classId
    console.log(request.params.classId)
    getCollection('class').findOneAndDelete({'_id': ObjectId(uid)}, (err, result) => {
        if (err) return response.send(500, err);
        response.send(result);
     }); 
})

export default classRouter