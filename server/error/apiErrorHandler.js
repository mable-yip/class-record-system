
const apiErrorHandler = (err, req, res, next) => {
    console.log(err)
    const {code, msg} = err

    if (code && msg){
        res.status(code).send(msg)
        return
    }

    res.status(500).send("something went wrong")
}

export default apiErrorHandler