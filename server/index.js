
import userRouter from "./routes/user.js";
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { default as mongodb } from 'mongodb'
import authenticateToken  from './middleware/auth.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

let MongoClient = mongodb.MongoClient
const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
dotenv.config()

app.use("/user", userRouter);
let database, userDb, classHistoryDb;

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.6iqab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const DATABASE_NAME = "class-record-system"
const PORT = 5000

app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        userDb = database.collection("user");
        classHistoryDb = database.collection("classHistory");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/login", async (request, response) => {
    const user = await userDb.findOne({ email: request.body.email})
    if (user == null) return response.status(400).send("Cannot find user")

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

app.get("/user/:email", async (req, res)=>{
    const user = await userDb.findOne({ email: req.params.email})
    if (user == null){
        res.status(400).send("Cannot find user")
    } else{
        res.status(200).send(user)
    }
})

app.post("/admin/user", authenticateToken, async (request, response) => {
    const existingUser = await userDb.findOne({ email: request.body.email})
    console.log(existingUser)
    if(existingUser) return response.status(400).send({message: "User already exist"})

    const salt =  await bcrypt.genSalt()
    const hashedPassword =  await bcrypt.hash(request.body.password, salt)

    userDb.insertOne({...request.body, password: hashedPassword}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.status(200).send({message: "User had been created successfully"});// should have problem here
    });
});

app.delete("/admin/user/:email", async (request, response) => {
    try {
        // update teacher if studentList of the teacher contains the student to be deleted
        await userDb.updateMany(
            { studentList: {$in:[request.params.email]}},
            {$pull: { "studentList" : request.params.email}})

        await userDb.deleteOne({ "email" : request.params.email })
        response.status(200).send({message: "User had been deleted successfully"})
     } catch (e) {
        response.status(400)//check code 
     }
})

app.get("/admin/allTeachers", authenticateToken, async (request, response) => {
    await userDb.find({ userType: "teacher"}).toArray(function(error, documents) {
        if (error) throw error;
        response.send(documents);
    });
})

app.get("/admin/allStudents", authenticateToken, async (request, response) => {
    await userDb.find({ userType: "student"}).toArray(function(error, documents) {
        if (error) throw error;
        response.send(documents);
    });
})


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
