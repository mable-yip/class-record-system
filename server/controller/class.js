import { getCollection } from '../mongoDb.js'
import "../index.js"
import express from 'express';
import { default as mongodb } from 'mongodb'
import jwt_decode from 'jwt-decode';

const classRouter = express.Router();

function parseJwt(token) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return payload.toString();
  }

// TODO: change the verify token to be a middleware 

// get all classes belongs to a teacher
classRouter.get("/teacher/class/:token", async (request, response) => {

    try{
        const email= parseJwt(request.params.token)
        const result = await getCollection('class').find({ teacherEmail: email}).toArray()
        response.status(200).send(result)
    } catch(error){
        response.status(500).send(error)
    }
})

// Add a class to the database: verify token 
classRouter.post("/teacher/class", async (request, response) => {
    try{
        const result = await getCollection('class').insertOne(request.body)
        response.status(200).send(result.ops[0])
    } catch(error){
        return response.status(500).send(error)
    }
});

// delete a class from the database: verify token
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