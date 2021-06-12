import ApiError from './ApiError.js'

const apiErrorHandler = (err, req, res, next) => {
    console.log(err)

    if(err instanceof ApiError){
        res.status(err.code).send(err.msg)
        return
    }

    res.status(500).send("something went wrong")
}

export default apiErrorHandler