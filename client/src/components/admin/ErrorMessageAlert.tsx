import React from "react"
import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"
import { RootState } from "../../index"

const ErrorMessageAlert = () => {
    const { error } = useSelector((state: RootState) => state.admin)
      
    return(
        <Alert variant='danger'>
            {/* {errorMessge} */}
        </Alert>
    )
}

export default ErrorMessageAlert