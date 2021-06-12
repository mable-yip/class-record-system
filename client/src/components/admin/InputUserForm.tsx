import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'
import { Alert, Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../index';
import { Teacher, Student, UserType } from '../../interface/models'
import { clearError, createUserRequest } from '../../reducers/actionCreators';

const InputForm = (props: {userType: UserType.TEACHER | UserType.STUDENT, closeModal: () => void} ) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState<Teacher|Student>({ firstName:"", lastName: "", email:"", password:"", userType: props.userType})
    const [confirmedPassword, setConfirmedPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string|null>(null)
    const { error, loading } = useSelector((state: RootState) => state.admin)
    const [formSent, setFormSent] = useState(false) 

    console.log("error from api", error)
    console.log("loading", loading)
    
    useEffect(()=>{
        if(!loading && formSent){
            if(error){
                setErrorMessage(error)
                return
            }
            setForm({ firstName:"", lastName: "", email:"", password:"", userType: props.userType})
            setConfirmedPassword("")
            props.closeModal()
        }
    }, [loading])

    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setForm({...form, [key]: newValue})
    }

    const displayErrorMessage = () => {
        return(
            errorMessage && 
            <Alert variant='danger'>
                {errorMessage}
            </Alert>
        )
    }

    const handleSubmit = () => {
        // clear the error message saved previosuly 
        setFormSent(false)
        setErrorMessage(null)
        dispatch(clearError(null))  // TODO: check whether this action is needed or not 
        if (form.password !== confirmedPassword){
            setErrorMessage("Passwords does not match!")
            return
        } 
        dispatch(createUserRequest({
            body: form
        }))
        setFormSent(true)
    }

    return (
        <div>
            <Form>
                <FormGroup>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="First Name" 
                        value={form.firstName}
                        onChange={handleOnChange("firstName")}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Last Name" 
                        value={form.lastName}
                        onChange={handleOnChange("lastName")}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Email" 
                        value={form.email}
                        onChange={handleOnChange("email")}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={form.password}
                        onChange={handleOnChange("password")}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmedPassword}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmedPassword(event.target.value)}
                    />
                </FormGroup>

                {displayErrorMessage()}

                <Button
                    className="btn-lg btn-dark btn-block"
                    onClick={handleSubmit}
                >
                    Create {props.userType.charAt(0).toUpperCase() + props.userType.slice(1)}
                </Button>

            </Form>
        </div>
    )
}

export default InputForm 