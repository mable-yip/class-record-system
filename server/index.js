import './mongoDb.js'
import express from 'express'
import cors from 'cors'
import usersRouter from './controller/user.js'
import classRouter from './controller/class.js'
import apiErrorHandler from "./error/apiErrorHandler.js"
import path from 'path'


console.log(path.resolve())

const app = express();
const publicPath = path.join(path.resolve(), '..', 'public');
app.use(express.static(publicPath));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
//app.use(express.static(path.join(__dirname, '../client/build')));
const PORT = 5000

// Use the routes
app.use('/', usersRouter);
app.use('/', classRouter);
app.use(apiErrorHandler);

// Listen for connections
app.listen(PORT);

app.patch("/teacher/:email/addStudent", async (request, response) => {
    try{
        const existingStudent = await userDb.findOne({ email: request.params.email, studentList: {$in:[request.body.studentEmail]}})

        if(existingStudent) return response.status(400).send({message: "Stduent already in the list"})

        await userDb.update({ "email" : request.params.email },
            {$push: { "studentList" : request.body.studentEmail}})
        response.status(200).send("success")
    } catch(e){
        response.status(400).send(e.message)
    }
})

app.patch("/teacher/:email/removeStudent", async (request, response) => {
    try{     
        await userDb.update({ "email" : request.params.email },
            {$pull: { "studentList" : request.body.studentEmail}})
        response.status(200).send("success")
    } catch(e){
        response.status(400).send(e.message)
    }
})

app.get("/teacher/classHistory/:email", async (request, response) => {

    await classHistoryDb.find({ teacher: request.params.email}).toArray(function(error, documents) {
        if (error) throw error;
        response.send(documents);
    });
})