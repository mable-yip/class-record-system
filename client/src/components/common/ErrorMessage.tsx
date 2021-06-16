import { Alert } from "react-bootstrap"

const ErrorMessage = (props: {errorMessage: string | undefined}) => {
    return(
        props.errorMessage? 
        <Alert variant='danger'>
            {props.errorMessage}
        </Alert> :
        <div> </div>
    )
}

export default ErrorMessage