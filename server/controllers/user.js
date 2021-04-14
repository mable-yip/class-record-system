import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "jwtSecret"

export const signin = async (req, res) => {
    const { email, password } = req.body
    try{

    } catch(error){
        res.status(500).json({ message: "Something went wrong" })
    }
}