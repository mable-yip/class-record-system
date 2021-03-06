import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, "jwtSecret", (err, user) => {

        if (err) return res.sendStatus(403) // token is no longer valid
        req.user =  user
        console.log("!!!", user)
        next()
    })
}

export default authenticateToken